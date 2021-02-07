import { tryReadFile } from './file';
import { Rule, ruleJoin } from './rule-maker/rule';
import { readRuleFile } from './ruleManager';
import { LintOut } from './output';
import { getInitRules } from './extend';

export function lint(fileNames: string[], ruleFileName?: string): LintOut[] {
    let rules = readRuleFile(ruleFileName);
    if (rules === []) {
        if (fileNames.length > 0) {
            rules = getInitRules(fileNames[0]);
        } else{
            return [];
        }
    }

    const out: LintOut[] = [];
    for (const fileName of fileNames) {
        const fileContents = tryReadFile(fileName);
        if (fileContents === undefined) {
            continue;
        }
        const lintResult = lintWithRules(fileName, fileContents, rules);
        out.push(...lintResult);
    }

    return out;
}

export function lintWithRules(fileName: string, contents: string, rules: Rule[]): LintOut[] {
    const matched: LintOut[] = [];
    for (const rule of rules) {

        if (!verifyPattern(rule)) { continue; }
        const matchedResult = makeSnippetRegex(rule.before, contents, rule.isRegex);
        for (const result of matchedResult) {
            matched.push({rule: rule,
                snippet: result[0],
                fileName,
                position: makePatternPosition(result)});
        }
    }

    return matched;
}

export function fix(fileName: string, ruleFileName?: string): string {
    let rules = readRuleFile(ruleFileName);
    if (rules === []) {
        rules = getInitRules(fileName);
    }

    const fileContents = tryReadFile(fileName);
    if (fileContents === undefined) {
        throw new Error(`Failed to read ${fileName}`);
    }
    const lintResult = lintWithRules(fileName, fileContents, rules);
    const detectedRules = lintResult.map(x => { return x.rule; });
    let fixedContents = fileContents;
    for (const rule of detectedRules) {
        fixedContents = getReplaceString(fixedContents, rule);
    }

    return fixedContents;
}

export function fixWithRule(fileContents: string, rule: Rule): string {
    if (rule.after.length === 0 || rule.before.length === 0) {
        return fileContents;
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let after = ruleJoin(rule.after).replace(dollar, (_, y) => (`$<token${(parseInt(y, 10) + 1)}>`));

    if (rule.isRegex) {
        after = rule.after[0];
    }
    const reBefore = before2regex2(rule.before, rule.isRegex);

    if (reBefore !== undefined) {
        const matchedStr = reBefore.exec(fileContents);
        if (matchedStr !== null) {
            return fileContents.replace(reBefore, after);
        }

        return fileContents;
    }

    return fileContents;
}

export function getReplaceString(content: string, rule: Rule): string {
    let search = ruleJoin(rule.before);
    const replace = ruleJoin(rule.after);
    if (!rule.isRegex) {
        search = escapeRegExpCharacters(search);
    }
    const regExp = new RegExp(search, 'g');
    const match = regExp.exec(content);
    if (match) {
        const replaceString = replaceWithCaseOperations(content, regExp, replace);
        return replaceString;
    }
    return content;
}


function before2regex2(before: string[] | string, regex?: boolean) {
    if (regex) {
        return new RegExp(before[0], 'gm');
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let joinedBefore = ruleJoin(before);
    joinedBefore = joinedBefore.replace(dollar, (_, y) => (`$${(parseInt(y, 10) + 1)}`));
    joinedBefore = joinedBefore.replace(/[<>*()?.[\]]/g, '\\$&');

    const tokenIndex: number[] = [];
    joinedBefore = joinedBefore.replace(dollar, (x) => {
        const index = parseInt(x[1], 10);
        if (tokenIndex.includes(index)) {
            return `(\\k<token${index}>)`;
        }
        tokenIndex.push(index);

        return `(?<token${index}>[\\w.]+)`;
    });
    try {
        return new RegExp(joinedBefore, 'gm');
    } catch (error) {
        return undefined;
    }
}

function makeSnippetRegex(before: string[] | string, contents: string, regex?: boolean) {
    let search = ruleJoin(before);
    if (!regex) {
        search = escapeRegExpCharacters(search);
    }
    const regExp = new RegExp(search, 'g');
    let match: RegExpExecArray | null;
    const matches: RegExpExecArray[] = [];
    while ((match = regExp.exec(contents)) !== null) {
        matches.push(match);
    }
    return matches;
}

function verifyPattern(rule: Rule) {
    return Array.isArray(rule.before) && Array.isArray(rule.after);
}

function makePatternPosition(result: RegExpExecArray) {
    const startIndex = result.index;
    const headSlice = result.input.slice(undefined, startIndex).split(/\r\n|\r|\n/);
    const startLine = headSlice.length;
    const startChar = startLine === 1 ?
                      startIndex + 1 - headSlice.slice(undefined, -1).join('\n').length:
                      startIndex - headSlice.slice(undefined, -1).join('\n').length;
    const matchedSlice = result[0].split(/\r\n|\r|\n/);
    const endLine = startLine + matchedSlice.length - 1;
    const endChar = startLine === endLine ?
                    startChar + matchedSlice[matchedSlice.length - 1].length :
                    1 + matchedSlice[matchedSlice.length - 1].length;

    return {
        start:{
            line: startLine,
            character: startChar
        }, 
        end: {
            line: endLine,
            character: endChar
        }};
}

/**
 * replaceWithCaseOperations applies case operations to relevant replacement strings and applies
 * the affected $N arguments. It then passes unaffected $N arguments through to string.replace().
 *
 * \u			=> upper-cases one character in a match.
 * \U			=> upper-cases ALL remaining characters in a match.
 * \l			=> lower-cases one character in a match.
 * \L			=> lower-cases ALL remaining characters in a match.
 */
function replaceWithCaseOperations(text: string, regex: RegExp, replaceString: string): string {
    // Short-circuit the common path.
    if (!/\\[uUlL]/.test(replaceString)) {
        return text.replace(regex, replaceString);
    }
    // Store the values of the search parameters.
    const firstMatch = regex.exec(text);
    if (firstMatch === null) {
        return text.replace(regex, replaceString);
    }

    let patMatch: RegExpExecArray | null;
    let newReplaceString = '';
    let lastIndex = 0;
    let lastMatch = '';
    const caseOpsRegExp = new RegExp(/([^\\]*?)((?:\\[uUlL])+?|)(\$[0-9]+)(.*?)/g);
    // For each annotated $N, perform text processing on the parameters and perform the substitution.
    while ((patMatch = caseOpsRegExp.exec(replaceString)) !== null) {
        lastIndex = patMatch.index;
        const fullMatch = patMatch[0];
        lastMatch = fullMatch;
        let caseOps = patMatch[2]; // \u, \l\u, etc.
        const money = patMatch[3]; // $1, $2, etc.

        if (!caseOps) {
            newReplaceString += fullMatch;
            continue;
        }
        const replacement = firstMatch[parseInt(money.slice(1))];
        if (!replacement) {
            newReplaceString += fullMatch;
            continue;
        }
        const replacementLen = replacement.length;

        newReplaceString += patMatch[1]; // prefix
        caseOps = caseOps.replace(/\\/g, '');
        let i = 0;
        for (; i < caseOps.length; i++) {
            switch (caseOps[i]) {
                case 'U':
                    newReplaceString += replacement.slice(i).toUpperCase();
                    i = replacementLen;
                    break;
                case 'u':
                    newReplaceString += replacement[i].toUpperCase();
                    break;
                case 'L':
                    newReplaceString += replacement.slice(i).toLowerCase();
                    i = replacementLen;
                    break;
                case 'l':
                    newReplaceString += replacement[i].toLowerCase();
                    break;
            }
        }
        // Append any remaining replacement string content not covered by case operations.
        if (i < replacementLen) {
            newReplaceString += replacement.slice(i);
        }

        newReplaceString += patMatch[4]; // suffix
    }

    // Append any remaining trailing content after the final regex match.
    newReplaceString += replaceString.slice(lastIndex + lastMatch.length);

    return text.replace(regex, newReplaceString);
}

export function createRegExp(rule: Rule): RegExp {
    let searchString = ruleJoin(rule.before);
	if (!searchString) {
		throw new Error('Cannot create regex from empty string');
	}
	if (!rule.isRegex) {
		searchString = escapeRegExpCharacters(searchString);
	}
	if (rule.wholeWord) {
		if (!/\B/.test(searchString.charAt(0))) {
			searchString = '\\b' + searchString;
		}
		if (!/\B/.test(searchString.charAt(searchString.length - 1))) {
			searchString = searchString + '\\b';
		}
	}
	let modifiers = 'g';
	if (!rule.matchCase) {
		modifiers += 'i';
	}
	if (rule.before.length > 1) {
		modifiers += 'm';
	}

	return new RegExp(searchString, modifiers);
}

/**
 * Escapes regular expression characters in a given string
 */
export function escapeRegExpCharacters(value: string): string {
	return value.replace(/[\\{}*+?|^$.[\]()]/g, '\\$&');
}

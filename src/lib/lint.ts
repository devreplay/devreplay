import { tryReadFile } from './file';
import { Rule, ruleJoin } from './rule';
import { readRuleFile } from './ruleManager';
import { LintOut } from './output';
import { Range } from './position';
import { getInitRules } from './extend';

/**
 * Linting files by the rule and output warnings
 * @param fileNames Validate target file pathes
 * @param ruleFileName DevReplay rule file path
 */
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

/**
 * Linting source code content with the defined rules
 * @param fileName Target file name for generate output string
 * @param contents Target file contents for linting
 * @param rules Target rules from rule files or implemented rules
 */
export function lintWithRules(fileName: string, contents: string, rules: Rule[]): LintOut[] {
    const lintOut: LintOut[] = [];
    for (const rule of rules) {
        const regExp = createRegExp(rule);
        let match: RegExpExecArray | null;
        while ((match = regExp.exec(contents)) !== null) {
            lintOut.push({
                rule: rule,
                snippet: match[0],
                fileName,
                position: makeMatchedRange(match)
            });
        }
    }

    return lintOut;
}

/**
 * Generate fixed source code file content
 * @param fileName Target be fixed file path
 * @param ruleFileName Target DevReplay rule file path
 */
export function fix(fileName: string, ruleFileName?: string): string {
    const fileContents = tryReadFile(fileName);
    if (fileContents === undefined) {
        throw new Error(`Failed to read ${fileName}`);
    }
    const lintResult = lint([fileName], ruleFileName);
    const warnedRules = lintResult.map(x => { return x.rule; });

    return fixWithRules(fileContents, warnedRules);
}

/**
 * Generate fixed string by using rule regular expression
 * @param content Prefixed content
 * @param rules Rules that has regular expression
 */
export function fixWithRules(content: string, rules: Rule[]): string {
    for (const rule of rules) {
        const replace = ruleJoin(rule.after);
        const regExp = createRegExp(rule);
        if (regExp.exec(content)) {
            content = replaceWithCaseOperations(content, regExp, replace);
            continue;
        }
    }
    return content;
}

/**
 * Make the matched range from Regular expression result
 * @param result 
 */
function makeMatchedRange(result: RegExpExecArray): Range {
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

/**
 * Create search regex from rule
 * @param rule Target rule
 */
function createRegExp(rule: Rule): RegExp {
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
function escapeRegExpCharacters(value: string): string {
	return value.replace(/[\\{}*+?|^$.[\]()]/g, '\\$&');
}

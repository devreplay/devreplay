export interface IPattern {
    count?: number;
    code: string[];
}

export function code2String(code: string[]) {
    return `${makeBefore(code).join("")} should be ${makeAfter(code).join("")}`;
}

function makeBefore(changes: string[]) {
    const beforeChanges: string[] = [];
    for (const change of changes) {
        if (change.startsWith("*")) {
            const before = change.slice(2).split("-->")[0].slice(undefined, -1).split(" ");
            beforeChanges.push(...before);
        } else if (!change.startsWith("+")) {
            const before = change.slice(2).split(" ");
            beforeChanges.push(...before);
        }
    }
    return beforeChanges;
}

function makeAfter(changes: string[]) {
    const afterChanges: string[] = [];
    for (const change of changes) {
        if (change.startsWith("*")) {
            const after = change.slice(2).split("-->")[1].slice(1).split(" ");
            afterChanges.push(...after);
        } else if (!change.startsWith("-")) {
            const after = change.slice(2).split(" ");
            afterChanges.push(...after);
        }
    }
    return afterChanges;
}

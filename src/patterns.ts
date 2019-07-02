export interface IPattern {
    count?: number;
    code: string[];
}

export function code2String(code: string[]) {
    return `${makeBefore(code).join("")} should be ${makeAfter(code).join("")}`;
}

export function makeBefore(code: string[]) {
    const beforeChanges: string[] = [];
    if (code === undefined) {
        return beforeChanges;
    }
    for (const change of code) {
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

export function makeAfter(code: string[]) {
    const afterChanges: string[] = [];
    if (code === undefined) {
        return afterChanges;
    }
    for (const change of code) {
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

interface ISource {
    [key: string]: {
        path: string;
        extensions: string[];
    };
}

export const sources: ISource = {
    cpp: {
        extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx", ".h", ".ino", ".inl", ".ipp"],
        path: "CPP/devreplay.json",
    },
    java: {
        extensions: [".java", ".jav"],
        path: "Java/devreplay.json",
    },
    javascript : {
        extensions: [".js", ".es6", ".mjs", ".pac"],
        path: "JavaScript/devreplay.json",
    },
    python: {
        extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi", ".snakefile", ".smk"],
        path: "Python/devreplay.json",
    },
    ruby: {
        extensions: [ ".rb", ".rbx", ".rjs", ".gemspec", ".rake", ".ru", ".erb" ],
        path: "Ruby/devreplay.json",
    },
    typescript: {
        extensions: [".ts"],
        path: "Typescript/devreplay.json",
    },
};

export function getSource(fileName: string) {
    for (const source in sources) {
        if (sources[source].extensions.some((x) => fileName.endsWith(x))) {
            return source;
        }
    }
    return;
}

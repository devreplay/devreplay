export interface ISource {
    source: string;
    path: string;
    extensions: string[];
}

export const sources: ISource[] = [
    {
        extensions: [".js", ".es6", ".mjs", ".pac"],
        path: "./syntaxes/JavaScript.tmLanguage.json",
        source: "source.js",
    },
    {
        extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi", ".snakefile", ".smk"],
        path: "./syntaxes/MagicPython.tmLanguage.json",
        source: "source.python",
    },
    {
        extensions: [".java", ".jav"],
        path: "./syntaxes/java.tmLanguage.json",
        source: "source.java",
    },
    {
        extensions: [".ts"],
        path: "./syntaxes/TypeScript.tmLanguage.json",
        source: "source.ts",
    },
    {
        extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx", ".h", ".ino", ".inl", ".ipp"],
        path: "./syntaxes/cpp.tmLanguage.json",
        source: "source.cpp",
    },
    {
        extensions: [ ".rb", ".rbx", ".rjs", ".gemspec", ".rake", ".ru", ".erb" ],
        path: "./syntaxes/ruby.tmLanguage.json",
        source: "source.ruby",
    },
];

export interface ISource {
    id: string;
    path: string;
    extensions: string[];
}

export const sources: ISource[] = [
    {
        extensions: [".js", ".es6", ".mjs", ".pac"],
        id: "javascript",
        path: "./syntaxes/JavaScript.tmLanguage.json",
    },
    {
        extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi", ".snakefile", ".smk"],
        id: "python",
        path: "./syntaxes/MagicPython.tmLanguage.json",
    },
    {
        extensions: [".java", ".jav"],
        id: "java",
        path: "./syntaxes/java.tmLanguage.json",
    },
    {
        extensions: [".ts"],
        id: "typescript",
        path: "./syntaxes/TypeScript.tmLanguage.json",
    },
    {
        extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx", ".h", ".ino", ".inl", ".ipp"],
        id: "cpp",
        path: "./syntaxes/cpp.tmLanguage.json",
    },
    {
        extensions: [ ".rb", ".rbx", ".rjs", ".gemspec", ".rake", ".ru", ".erb" ],
        id: "ruby",
        path: "./syntaxes/ruby.tmLanguage.json",
    },
];

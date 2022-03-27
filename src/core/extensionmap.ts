/**
 * Index for file extension map.
 * 
 * @module
 */

interface GrammarPath {
    [key: string]: string[];
}

/**
 * List of grammar path with the extension
 */
export const grammarPaths: GrammarPath = {
    'source.c': ['.c'],
    'source.cpp': ['.cpp'],
    'source.csharp': ['.cs'],
    'source.go': ['.go'],
    'source.html': ['.html'],
    'source.java': ['.java'],
    'source.js': ['.js'],
    'source.json': ['.json'],
    'source.perl': ['.perl'],
    'source.perl.6': ['.perl6'],
    'source.php': ['.php'],
    'source.python': ['.py'],
    'source.r': ['.r'],
    'source.ruby': ['.ruby'],
    'source.rust': ['.rs'],
    'source.swift': ['.swift'],
    'source.ts': ['.ts']
};

/**
 * Get grammar path by extension
 * @param path source file path
 * @returns grammar `source.xxx`
 */
export function getFileSource(path: string): string | undefined {
    for (const grammarPath in grammarPaths) {
        for (const extension of grammarPaths[grammarPath]) {
            if (path.endsWith(extension)){
                return grammarPath;
            }
        }
    }
    return undefined;
}
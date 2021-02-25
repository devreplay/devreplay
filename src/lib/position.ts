/**
 * Lint result position
 */
export interface Position {
    line: number;
    character: number;
}

/**
 * Lint result position range
 */
export interface Range {
    start: Position;
    end: Position;
}
import { existsSync, openSync, closeSync, readFileSync, readSync } from 'fs';

/**
 * Read file and return file content
 * @param filename Target file path
 */
export function tryReadFile(filename: string): string | undefined {
    if (!existsSync(filename)) {
        throw new Error(`Unable to open file: ${filename}`);
    }
    const buffer = Buffer.allocUnsafe(256);
    const fd = openSync(filename, 'r');
    try {
        readSync(fd, buffer, 0, 256, 0);
        if (buffer.readInt8(0) === 0x47 && buffer.readInt8(188) === 0x47) {
            console.log(`${filename}: ignoring MPEG transport stream\n`);

            return undefined;
        }
    } finally {
        closeSync(fd);
    }

    return readFileSync(filename, 'utf8');
}

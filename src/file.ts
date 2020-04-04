import * as fs from 'fs';

export function tryReadFile(filename: string) {
    if (!fs.existsSync(filename)) {
        throw new Error(`Unable to open file: ${filename}`);
    }
    const buffer = Buffer.allocUnsafe(256);
    const fd = fs.openSync(filename, 'r');
    try {
        fs.readSync(fd, buffer, 0, 256, 0);
        if (buffer.readInt8(0) === 0x47 && buffer.readInt8(188) === 0x47) {
            console.log(`${filename}: ignoring MPEG transport stream\n`);

            return undefined;
        }
    } finally {
        fs.closeSync(fd);
    }

    return fs.readFileSync(filename, 'utf8');
}

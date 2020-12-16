import * as parsediff from 'parse-diff';
import { getFileSource } from 'source-code-tokenizer';

type ChunkState = 'added' | 'deleted' | 'changed' | 'nothing'


export interface Chunk {
    source: string;
    type: ChunkState;
    readonly deleted: string[];
    readonly added: string[];
}

export function makeDiffObj(diff: string): Chunk[] {
    const files: parsediff.File[] = parsediff(diff);
    const chunks: Chunk[] = [];
    for (const file of files) {
        
        if (file.to === undefined || getFileSource(file.to) === undefined) {
            continue;
        }
        const source = getFileSource(file.to);
        if (source === undefined || source === 'source.json' || source === 'source.html') {
            continue;
        }

        for (const chunk of file.chunks) {
            let tmp_chunk: Chunk = { source: source, deleted: [], added: [], type: 'nothing' };
            // let previousType: parsediff.ChangeType = 'normal';
            let addCount = 0;
            let delCount = 0;
            let prevChangetype = 'nothing';

            for (const change of chunk.changes){
                const line = change.content;
                let normalchunk: string[] = []
                // tmp_chunk = { source: source, deleted: [], added: [], type: 'nothing' };
                if (line === '\\ No newline at end of file') {
                    continue;
                }
                const content = line.slice(1);
                if (change.type === 'normal') {
                    tmp_chunk.deleted.push(content);
                    tmp_chunk.added.push(content);
                    normalchunk.push(content)
                } else if (change.type === 'del') {
                    if (prevChangetype === 'normal') {
                        if (addCount !== 0 || delCount !== 0) {
                            tmp_chunk.type = getChunkType(tmp_chunk.added, tmp_chunk.deleted);
                            chunks.push(tmp_chunk);
                            tmp_chunk = { source: source, deleted: Object.assign([], normalchunk), added: Object.assign([], normalchunk), type: 'nothing' };
                            addCount = 0;
                            delCount = 0;
                        }
                    }
                    tmp_chunk.deleted.push(content);
                    normalchunk = []
                    delCount += 1
                } else if (change.type === 'add'){
                    if (prevChangetype === 'normal') {
                        if (addCount !== 0 || delCount !== 0) {
                            tmp_chunk.type = getChunkType(tmp_chunk.added, tmp_chunk.deleted);
                            chunks.push(tmp_chunk);
                            tmp_chunk = { source: source, deleted: Object.assign([], normalchunk), added: Object.assign([], normalchunk), type: 'nothing' };
                            addCount = 0;
                            delCount = 0;
                        }
                    }
                    tmp_chunk.added.push(content);
                    normalchunk = []
                    addCount += 1;
                }
                prevChangetype = change.type;
            }
            if (tmp_chunk.deleted.length > 0 || tmp_chunk.added.length > 0) {
                tmp_chunk.type = getChunkType(tmp_chunk.added, tmp_chunk.deleted);
                chunks.push(tmp_chunk);
            }
        }
    }
    return chunks;
}

function getChunkType (add: string[], deleted: string[]): ChunkState {
    const add_len = add.length;
    const del_len = deleted.length;
    if (add_len > 0 && del_len > 0) {
        return 'changed';
    }
    if (add_len > 0) {
        return 'added';
    }
    if (del_len > 0) {
        return 'deleted';
    }
    return 'nothing';
}
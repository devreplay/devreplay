import * as parsediff from 'parse-diff';
import { getFileSource } from 'source-code-tokenizer';

export type ChunkState = 'added' | 'deleted' | 'changed' | 'nothing'


export interface Chunk {
    source: string;
    type: ChunkState;
    readonly deleted: string[];
    readonly added: string[];
}

export function makeDiffObj(diff: string) {
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
            let previousType: parsediff.ChangeType = 'normal';
            for (const change of chunk.changes){
                const line = change.content;
                if (line === '\\ No newline at end of file') {
                    continue;
                }
                if (change.type === 'normal') {
                    if (tmp_chunk.deleted.length > 0 || tmp_chunk.added.length > 0) {
                        tmp_chunk.type = getChunkType(tmp_chunk.added, tmp_chunk.deleted);
                        chunks.push(tmp_chunk);
                        tmp_chunk = { source: source, deleted: [], added: [], type: 'nothing' };
                    }
                }
                else if (change.type === 'del') {
                    const content = line.slice(1);
                    if (previousType === 'del') {
                        tmp_chunk.deleted.push(content);
                    } else if (tmp_chunk.deleted.length > 0 || tmp_chunk.added.length > 0) {
                        tmp_chunk.type = getChunkType(tmp_chunk.added, tmp_chunk.deleted);
                        chunks.push(tmp_chunk);
                        tmp_chunk = { source: source, deleted: [], added: [], type: 'nothing' };
                        tmp_chunk.deleted.push(content);
                    } else {
                        tmp_chunk.deleted.push(content);
                    }

                }
                else if (change.type === 'add'){
                    const content = line.slice(1);
                    if (tmp_chunk.deleted === []){
                        continue;
                    }
                    tmp_chunk.added.push(content);
                }
                previousType = change.type;
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
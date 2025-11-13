import fs from 'fs';
import path from 'path';

export function validateLocalPath(input: string): boolean {
    return fs.existsSync(path.resolve(input));
}
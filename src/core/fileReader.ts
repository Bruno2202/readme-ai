import { File } from "../types/File";
import fs from "fs";
import path from "path";
import { IGNORED_PATHS, VALID_EXTENSIONS, VALID_FILENAMES } from "../config/files";

export function readFiles(dirPath: string): File[] {
    const files: File[] = [];

    function searchFiles(dir: string) {
        const itens = fs.readdirSync(dir);
        for (const item of itens) {
            const filePath = path.join(dir, item);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                if (IGNORED_PATHS.includes(item)) continue;
                searchFiles(filePath);
            } else {
                const extensionRegex = new RegExp(`\\.(${VALID_EXTENSIONS.join('|')})$`, 'i');
                const isValidExtension = extensionRegex.test(item);
                const isValidFilename = VALID_FILENAMES.includes(item.toUpperCase());

                if (isValidExtension || isValidFilename) {
                    const content = fs.readFileSync(filePath, "utf8");
                    files.push({ name: path.relative(dirPath, filePath), content });
                }
            }
        }
    }

    searchFiles(dirPath);

    return files;
}
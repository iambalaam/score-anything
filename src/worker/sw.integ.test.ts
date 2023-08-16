// import { cacheFiles } from './sw';

import { accessSync, readdirSync, lstatSync } from 'fs';
import { resolve } from 'path';

const ROOT_DIR = resolve(__dirname, '../..');
const BUILD_DIR = resolve(ROOT_DIR, 'dist');

const ignoreList = [
    'index.html',
    'sw.js',
    'bundle-analyzer.html',
    '.LICENSE.txt',
    '.map',
];

function shouldCache(filePath: string) {
    if (ignoreList.some(
        (ignore) => filePath.endsWith(ignore))
    ) return false;

    return true;
}

function findFilesInDir(path: string): string[] {
    const files: string[] = [];
    try {
        accessSync(path)

        const contents = readdirSync(path);
        contents.forEach((item) => {
            const fullPath = resolve(path, item);
            const stats = lstatSync(fullPath);
            if (stats.isDirectory()) {
                files.push(...findFilesInDir(fullPath));
            } else if (stats.isFile()) {
                files.push(fullPath);
            }
        })
    } catch (err) {
        console.error(err);
    }

    return files;
}

const filesToCahce = findFilesInDir(BUILD_DIR)
    .filter(shouldCache)
    .map((file) => {
        return file.replace(BUILD_DIR, '');
    });

describe('cacheFiles', () => {
    // todo exports
    it.skip('should be up to date', () => {
        // expect(cacheFiles).toEqual(filesToCahce);
    });
});
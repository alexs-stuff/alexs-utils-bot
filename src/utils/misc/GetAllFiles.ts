import fs from 'fs';
import Path from 'path';
import { Logger } from '../../events/Logger';



export class GetAllFiles {
    static async getContent(directory: string, onlyFolders:boolean = false) {
        let fileNames = [];
        Logger.log(`Reading files from ${directory}...`)
        const files = fs.readdirSync(directory, { withFileTypes: true});

        for (const file of files) {
            const filePath = Path.join(directory, file.name);
            if (onlyFolders) {
                if (file.isDirectory()) {
                    fileNames.push(file);
                }
            } else {
                if (file.isFile()) {
                    fileNames.push(file);
                }
            }
        }
        Logger.log(`Found ${fileNames.length} File(s)/Directory/ies`)
        return fileNames;
    }
}
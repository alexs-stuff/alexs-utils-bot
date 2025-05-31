import fs from 'fs';
import Path from 'path';
import { Logger, LoggerResultType, LoggerSeverityType } from '../Logger';
import { config } from '../../config/config';



export default async function GetAllFiles(directory: string, onlyFolders:boolean = false) {
        let fileNames = [];
        if (config.json.DEBUGGING) {
        Logger.log(`Reading files from ${directory}...`)
        }

        const files = fs.readdirSync(directory, { withFileTypes: true});

        for (const file of files) {
            const filePath = Path.join(directory, file.name);
            if (onlyFolders) {
                if (file.isDirectory()) {
                    fileNames.push(filePath);
                }
            } else {
                if (file.isFile()) {
                    fileNames.push(filePath);
                }
            }
        }

        if (config.json.DEBUGGING) {
            Logger.log(`Found ${fileNames.length} File(s) or Directory/ies`)
        }
        
        return fileNames;
}

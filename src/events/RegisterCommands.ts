import { GetAllFiles } from "../utils/misc/getAllFiles";
import { Logger, LoggerSeverityType } from "./Logger";
import Path from 'path'

export default async function RegisterCommands() {
    const commandFolders = await GetAllFiles.getContent( Path.join(__dirname, '..', 'commands'), true);
    console.log(commandFolders) ;

    for (const folder in commandFolders) {
        
       // const command = await GetAllFiles.getContent(folde);
       // console.log(command);
    }

}
   


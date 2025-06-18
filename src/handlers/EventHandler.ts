import { trace } from "console";
import { Logger } from "../utils/Logger";
import GetAllFiles from "../utils/misc/GetAllFiles";
import Path from 'path';


export default async function EventHandler(client:any) {
    const evtFolders = await GetAllFiles(Path.join(__dirname, '..', 'events'), true);
    for (const evtFolder of evtFolders) {
        const evtFiles = await GetAllFiles(evtFolder);
        evtFiles.sort((a, b) => a.localeCompare(b));

        const evtName = evtFolder.replace(/\\/g, '/').split('/').pop();

        client.on(evtName, async (...args:any[]) => {
            for (const evtFile of evtFiles) {
                const evtFileReq = require(evtFile);
                const evtFunc = evtFileReq.default || evtFileReq;
                await evtFunc(client, ...args);
            }
        });
    }
}
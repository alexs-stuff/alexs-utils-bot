import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { config } from '../config/config';

/*
  How this works
  when for example:
  {USER} ran {COMMAND} log something like:

  [12:34 @ 01/01/2025] INFO: {USER} ran {COMMAND} in [THEIR DMS/THE SERVER {ID}]

  the format will be toggleable in @/config.json/


  ~al_ex427
*/
export class Logger {
    /** 
     * Log something
     * @param severity Errors Senstivity
     * @param loggerTxt Thing to log
     */
    
    static log(loggerTxt:any, severity:LoggerSeverityType = LoggerSeverityType.None) {
        let sev = '';
        let text = '';
        
        switch (severity) {
            case LoggerSeverityType.None: 
                sev = chalk.blue('[LOGGER]');
                text = chalk.whiteBright(loggerTxt);
                break;
            case LoggerSeverityType.Warning:
                sev = chalk.yellow('[WARNING]');
                text = chalk.yellowBright(chalk.bold(loggerTxt));
                break;
            case LoggerSeverityType.Error:
                sev = chalk.red(chalk.bold('[ERROR]'));
                text = chalk.redBright(chalk.bold(loggerTxt));
                break;
        }

        
        if (config.conf.LOGGING) {
            console.log(`[${new Date(Date.now()).toLocaleTimeString()} @ ${new Date(Date.now()).toLocaleDateString()}] ${sev} ${text}`)
        }
        
    }
}

export enum LoggerSeverityType {
    None,
    Warning,
    Error
}
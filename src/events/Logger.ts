import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
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
    
    static log(severity:LoggerSeverityType, loggerTxt:String) {
        let sev = '';
        let text = '';
        //I AM NOT MAKING SWITCH STATEMENTS TO LOG ERRORS AND WARNING, HECK YOU
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

        
        //whatever works
        console.log(`[${new Date(Date.now()).toLocaleTimeString()} @ ${new Date(Date.now()).toLocaleDateString()}] ${sev} ${text}`)
    }

    static saveLogs() {
        const location:String = path.join(__dirname, '');
    }
}

export enum LoggerSeverityType {
    None,
    Warning,
    Error
}
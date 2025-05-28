import * as fs from 'fs';
import * as path from 'path';

/*
  How this works
  when for example:
  {USER} ran {COMMAND} log something like:

  [12:34 @ 01/01/2025] INFO: {USER} ran {COMMAND} in [THEIR DMS/THE SERVER {ID}]

  the format will be toggleable in @/config.json/


  ~al_ex427
*/
class Logger {
    static severity:SeverityType;

    static saveLogs() {
        const location:String = path.join(__dirname, '');
    }
}

enum SeverityType {
    None,
    Warning,
    Error
}
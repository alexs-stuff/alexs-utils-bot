import dotenv from 'dotenv';
import { Logger, LoggerSeverityType } from '../events/Logger';
import * as conf from '../../config.json';

dotenv.config();

const { TOKEN, CLIENT_ID } = process.env;

if (!TOKEN || !CLIENT_ID) {
    Logger.log(LoggerSeverityType.Error, 'BOT WILL NOT FUNCTION WITHOUT A PROPER TOKEN OR A PROPER CLIENT ID');
}
export const config = {
    TOKEN,
    CLIENT_ID,
    conf
}
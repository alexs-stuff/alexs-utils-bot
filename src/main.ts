import {Client, IntentsBitField} from 'discord.js';
import { config } from './config/config';
import { Logger, LoggerSeverityType } from './events/Logger';

console.log(`
══════════════════════════════════════════
              ALEX'S UTILS
══════════════════════════════════════════
`);

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', async () => {
    Logger.log(LoggerSeverityType.None, "Client logged in successfully");
    //Logger.log(LoggerSeverityType.Warning, "This is a warning");
    //Logger.log(LoggerSeverityType.Error, "This is an error");
});


client.login(config.TOKEN);




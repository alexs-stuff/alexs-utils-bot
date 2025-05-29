import {Client, IntentsBitField} from 'discord.js';
import { config } from './config/config';
import { Logger, LoggerSeverityType } from './events/Logger';
import RegisterCommands from './events/RegisterCommands';

console.log(`
^══════════════════════════════════════════^
^            ALEX'S UTILS [TS]             ^
^══════════════════════════════════════════^
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
    RegisterCommands();
    
    Logger.log("Client logged in successfully");
    
});

client.on('interactionCreate', async(interaction) => {
    if (!interaction.isCommand()) return;
    Logger.log(`${interaction.user.tag} ran ${interaction.commandName}`);
})

client.login(config.TOKEN);




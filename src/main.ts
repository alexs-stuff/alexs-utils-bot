import {Client, IntentsBitField} from 'discord.js';
import { Logger, LoggerSeverityType } from './utils/Logger';
import chalk from 'chalk';
import EventHandler from './handlers/EventHandler';
import mongoose from 'mongoose';
import { config } from './config/config';

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

(async ()=> {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.MONGODB_URL as string); //fuckass language

        EventHandler(client);
    } catch (e) {
        Logger.log(`Sadly, an error occured whilst setting up MongoDB. Bot will not start\nE: ${e}`, LoggerSeverityType.Error);
    }
    
})


client.on('interactionCreate', async(interaction) => {
    if (!interaction.isCommand()) return;
    //all the budget went to the style
    Logger.log(`${chalk.bold(interaction.user.tag)} ran the command ${chalk.bgGreenBright(chalk.blackBright(chalk.bold( " /" + interaction.commandName + " ")))}`); 
})


client.login(config.TOKEN);


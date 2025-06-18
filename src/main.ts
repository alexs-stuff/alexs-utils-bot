import {Client, IntentsBitField} from 'discord.js';
import { Logger, LoggerSeverityType } from './utils/Logger';
import EventHandler from './handlers/EventHandler';
import mongoose from 'mongoose';
import { config } from './config/config';
import DatabaseSchema from './utils/data/DatabaseSchemas';
import DatabaseHandler from './handlers/DatabaseHandler';
import chalk from 'chalk';

console.log(`
^══════════════════════════════════════════^
^            ALEX'S UTILS [TS]             ^
^══════════════════════════════════════════^
^                CONSOLE                   ^
`);

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

EventHandler(client);
DatabaseHandler(client);
        



client.login(config.TOKEN);


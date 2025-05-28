import {Client, IntentsBitField} from 'discord.js';
import { config } from './config/config';
import {} from './events/RegisterCommands';

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
    console.log(`✅ | Successfully logged into bot (${client.user?.tag})`);
    
});


client.login(config.TOKEN);




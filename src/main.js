const {Client, IntentsBitField, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder} = require('discord.js');
const moongose = require('mongoose');

const dotenv = require('dotenv');
const axios = require('axios');
const OpenAI = require('openai');

const registerCommands = require('./utils/registerCommands');
const bot_config =  require('../config.json');
dotenv.config();


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

//const gptCLIENT = new OpenAI({ apiKey: process.env.OPENAI_APIKEY});


client.once('ready', async () => {
    console.log('⌚ | Trying to load Mongoose..');
    try {
        moongose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ | Successfully connected to Moongoose/MongoDB..')
    } catch (e) {
        console.error(`❌ | Failed to connect/setup to Mongoose: ${e}`);
        return;
    } 
    registerCommands(client);
    console.log(`✅ | Logged in as ${client.user.tag}`);

});


const unavaliableEmbed = new EmbedBuilder().setColor('White').setTitle("Unavaliable Command").setDescription(`This command is unfinished right now.`);

async function sanitizeMsg(text) {
    text = text.replace(/<think>.*?<\/think>/gs, '');
    text = text.replace(/everyone|@here/g, '[mention]');
    text = text.replace(/<@!?(\d+)>/g, '[user]');
    
    return text.trim();
}
async function askAI(prompt, model) {
    if (model.startsWith('gpt')) {
        return await 'ChatGPT Models are being worked on right now. These will have a limit to not consume the tokens instantly';
    }
    
    try {
        const response = await axios.post(process.env.LLAMA_ADDRESS + '/generate', {
            model: model,
            prompt: prompt,
            stream: false,
        });
        return sanitizeMsg(response.data.response);
    } catch (e) {
        console.log(`Error occured\n${e}`)
        return 'Failed to generate a response.';
    }
}

function shorten(text) {
    if (text.length >= 64) {
        return 'Something (Over limit 64char limit)'
    } else {
        return text;
    }
}   


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
        case 'ping':
            const embed = new EmbedBuilder().setColor('Blue').setTitle("Pong!").setDescription(`Latency: ${client.ws.ping}ms\nUptime: ${Math.floor(client.uptime / 1000)}s`);
            await interaction.reply({embeds: [embed]});
            break;
        case 'help':
            await interaction.reply({embeds: [unavaliableEmbed]});
            break;
        case 'ai-prompt':
            if (bot_config.AI_SUPPORT) {
            const prompt = interaction.options.get('prompt');

            let model = interaction.options.get('model');
            if (!model) model= {value: 'llama3.2'};
            
            const askedPrompt = shorten(prompt.value);

         
            await interaction.deferReply();
            await interaction.editReply({embeds: [new EmbedBuilder().setDescription('Generating...').setColor('White')]});

            const timestampGenerate = Date.now();
            const response = await askAI(prompt.value, model.value);

            if (response.length >= 4000) {
                const buffer = Buffer.from(response, 'utf-8');
                await interaction.editReply({content: '', files: [{attachment: buffer, name: `Response for ${interaction.user.username}.txt`}]})
            } else {
                const timestamp = Date.now() - timestampGenerate;
                const embed = new EmbedBuilder()
                            .setAuthor({
                                    name: `${interaction.user.username} asked: ${askedPrompt}`,
                                    iconURL: interaction.user.avatarURL()
                            })
                            .setDescription(response)
                            .setColor("Random")
                            
                            .setFooter({
                                text: `Model used: ${model.value} • Took ${(timestamp / 1000).toFixed(2)}s to generate • Page 0/0`,
                            });
                            if (model.value.startsWith('gpt')) {
                                embed.setFooter({text: `Model used: ${model.value} • Tokens Used: ?/? • Took ${(timestamp / 1000).toFixed(2)}s to generate • Page 0/0`})
                            }

                const aiLeft = new ButtonBuilder().setCustomId('pageLeft').setLabel('⬅️').setStyle(ButtonStyle.Primary).setDisabled(true);
                const aiRight = new ButtonBuilder().setCustomId('pageRight').setLabel('➡️').setStyle(ButtonStyle.Primary).setDisabled(true);
                const thought = new ButtonBuilder().setCustomId('pageThink').setLabel('Bot Thinking').setStyle(ButtonStyle.Secondary).setDisabled(true);

                const buttons = new ActionRowBuilder().addComponents(aiLeft, aiRight, thought);

                await interaction.editReply({
                    content: '', 
                    embeds: [embed], 
                    components: [buttons]});
            }
   
            } else {
                await interaction.reply({content: 'AI is not avaliable', ephemeral: true});
            }
            
           break;
        }

});

client.login(process.env.TOKEN);
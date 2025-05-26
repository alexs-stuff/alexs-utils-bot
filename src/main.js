const {Client, IntentsBitField, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder} = require('discord.js');
const bot_config =  require('../config.json');
const dotenv = require('dotenv');
const axios = require('axios');
const registerCommands = require('./utils/registerCommands');

dotenv.config();


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


client.once('ready', async () => {
    await registerCommands(client);
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
        return await 'ChatGPT Models are not avaliable right now. as i dont have money for them';
    }
    
    try {
        const response = await axios.post(process.env.LLAMA_ADDRESS, {
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
                                    name: `${interaction.user.username} asked: ${prompt.value}`,
                                    iconURL: interaction.user.avatarURL()
                            })
                            .setDescription(response)
                            .setColor("Random")
                            .setFooter({
                                text: `Model used: ${model.value} • Took ${(timestamp / 1000).toFixed(2)}s to generate • Page 0/0`,
                            });

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
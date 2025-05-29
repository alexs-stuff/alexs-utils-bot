const { REST, Routes, InteractionContextType, ApplicationCommandOptionType } = require('discord.js');

const dotenv = require('dotenv');
const axios = require('axios');
const { model } = require('mongoose');

const commands = [
    {
        name: 'ping',
        description: 'Shows you the latency of the bot',
        contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]
    },
    {
        name: 'help',
        description: 'Shows the commands in the bot',
        contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]
    },
    {
        name: 'ai-prompt',
        description: 'asks a specified model something',
        contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
        options: [
            {
                name: 'prompt',
                description: 'Prompt to ask',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'model',
                description: 'AI Model',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {name: 'Deepseek R1 (Latest)', value: 'deepseek-r1:latest'},
                //    {name: 'Deepseek R1 (70B)', value: 'deepseek-r1:70b'},
                    {name: 'Llama 2 Uncensored', value: 'llama2-uncensored'},
                    {name: 'Llama 3.2', value: 'llama3.2'},
                    {name: 'GPT 4o', value: 'gpt-4o'}

                ]
            }
            
        ]
    },
    {
        name: 'reset-ai-data',
        description:'Resets all saved data you sent to the AI',
        contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
    }
]

async function getAiModels() {
    
    try {
        const response = await axios.get(process.env.LLAMA_ADDRESS + '/tags');
        
    } catch (e) {
        console.log(`Error occured\n${e}`)
        return '';
    }
}   


module.exports = async (client) => {
    const rest = new REST({ version: '10' }).setToken(client.token);
    getAiModels();
    try {
        console.log('⌚ |   Started refreshing/registering application commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands});
        console.log('✅ | Successfully reloaded/registerd application commands.');
    } catch (error) {
        console.error(`❌ | Error occured: ${error}`);
    }
    
}


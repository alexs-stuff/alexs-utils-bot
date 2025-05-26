const { REST, Routes, InteractionContextType, ApplicationCommandOptionType } = require('discord.js');

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
                    {name: 'Deepseek R1', value: 'deepseek-r1'},
                    {name: 'Llama 3.2', value: 'llama3.2'},
                    {name: 'GPT 4o-mini', value: 'gpt-4o-mini'}

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




module.exports = async (client) => {
    const rest = new REST({ version: '10' }).setToken(client.token);

    try {
        console.log('Started refreshing/registering application commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands});
        console.log('Successfully reloaded/registerd application commands.');
    } catch (error) {
        console.error(`Error occured: ${error}`);
    }
    
}


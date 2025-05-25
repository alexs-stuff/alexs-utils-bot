module.exports = {
    name: 'ping',
    description: 'Shows you the latency of the bot',
    dm_permission: true,
    type: 1,
    options: [],
    onRun: async (client, interaction) => {
        const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setTitle("Pong!")
                    .setDescription(`Latency: ${client.ws.ping}ms`);
                    
        await interaction.reply({embeds: [embed]});
    }
}
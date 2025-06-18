import { Client, Interaction } from "discord.js";
import { Logger } from "../../utils/Logger";
import chalk from "chalk";

export default async function(client:Client, interaction:Interaction) {
    if (!interaction.isChatInputCommand()) return;
    //const commandObj = 
    Logger.log(`${chalk.bold(interaction.user.tag)} ran the command ${chalk.bgGreenBright(chalk.blackBright(chalk.bold( " /" + interaction.commandName + " ")))}. Arguments: ${interaction.options.data.map((option) => {return `\n${chalk.bold(option.name)}: ${option.value}`})}`);
    try {
        interaction.reply({content: 'sorry bud im still working on the commands'});
    } catch (e) {
        interaction.reply({content: 'Something went wrong', ephemeral: true});
        return e;
    }
}
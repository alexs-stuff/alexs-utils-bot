import { Client, Interaction } from "discord.js";

module.exports = {
    name: "ping",
    description: "pings the bot",
    onCallback: async (client:Client, interaction:Interaction) => {
        //fuck you typescript for making me put class type
    }
}
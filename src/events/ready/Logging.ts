import { Client } from "discord.js";
import { Logger } from "../../utils/Logger";

export default async function(client:Client) {
    Logger.log(`Successfully logged in as ${client.user?.tag}`)
}
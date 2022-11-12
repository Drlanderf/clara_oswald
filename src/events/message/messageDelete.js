const { Message } = require("discord.js");
const Guild = require(`../../schemas/guild`);
const {embedGenerator}=require("../../functions/tools/embedGenerator")
module.exports = {
    name: "messageDelete",
    /**
     * @param {import("../../bot.js")} client
     * @param {Message} message
     */
    async execute(message, client) {},
};
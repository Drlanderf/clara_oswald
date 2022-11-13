const { Message, Client } = require("discord.js");
const Guild = require(`../../schemas/guild`);
const { sendLogMessage } = require("../../functions/tools/sendLogMessage");
module.exports = {
    name: "messageUpdate",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client) {},
};

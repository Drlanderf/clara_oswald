const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
const chalk = require("chalk");
const { checkDBGuildId } = require("../../functions/mongo/checkDBGuildId");
module.exports = {
    name: "guildDelete",
    /**
     * @param {import("discord.js").Guild} guild
     * @param {import("../../bot.js")} client
     */
    async execute(guild, client) {},
};
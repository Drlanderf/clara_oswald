const { GuildMember, Client } = require("discord.js");
module.exports = {
    name: "guildMemberUpdate",
    /**
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember
     * @param {Client} client
     */
    async execute(oldMember, newMember, client) {},
};

const {
  checkDBGuildId,
} = require(`${__dirname}/../../../functions/mongo/checkDBGuildId`);
const { Guild, Client } = require("discord.js");
module.exports = {
  name: "guildCreate",
  /**
   * @param {Guild} guild
   * @param {Client} client
   */
  async execute(guild, client) {
    console.log(`[EVENT] guildCreate : Bot join a new discord server...`);
    console.log(`Starting the DB check...`);
    await checkDBGuildId(client);
  },
};

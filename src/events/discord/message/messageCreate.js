const { Message } = require("discord.js");
const Guild = require(`../../../schemas/guild`);
const { sendLogMessage } = require("../../../functions/tools/sendLogMessage");
module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
  },
};

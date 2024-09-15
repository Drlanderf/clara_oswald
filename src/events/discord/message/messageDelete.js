const { Message, Client } = require("discord.js");
const { sendLogMessage } = require("../../../functions/tools/sendLogMessage");

module.exports = {
  name: "messageDelete",
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(message, client) {
    await sendLogMessage(message, 'New message deleted!', client)
  },
};

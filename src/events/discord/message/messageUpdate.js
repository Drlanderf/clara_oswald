const { Message, Client } = require("discord.js");
const { sendLogMessage } = require("../../../functions/tools/sendLogMessage");

module.exports = {
  name: "messageUpdate",
  /**
   * @param {Message} oldMessage
   * @param {Message} newMessage
   * @param {Client} client
   */
  async execute(oldMessage, newMessage, client) {
    sendLogMessage(newMessage, 'Message Edited!', client, oldMessage)
  },
};

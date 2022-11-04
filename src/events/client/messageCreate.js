const { Message, EmbedBuilder } = require("discord.js");
require("dotenv").config();
const MyTestingReplyVar00 = process.env.MY_TESTING_REPLY_VAR00;
const MyTestingReplyVar01 = process.env.MY_TESTING_REPLY_VAR01;
const MyReplyVar00 = process.env.MY_REPLY_VAR00;
const MyReplyVar01 = process.env.MY_REPLY_VAR01;
const LogChannelID = process.env.CHANNEL_AUTOLOG_ID;
module.exports = {
  name: "messageCreate",
  /**
   * @param {import("../../bot.js")} client
   * @param {Message} message
   */
  async execute(message, client) {
    // WARNING CLIENT EVERYTIME THE LAST
    if (message.author.bot) {
      console.warn(`Event messageCreate from another bot, do anything.`);
    } else {
      console.log("Event messageCreate successfully apply");
      const logChannel = client.channels.cache.get(`${LogChannelID}`);

      try {
        const test = message.content;
        const result = test.toLowerCase();
        if (result.includes(`${MyTestingReplyVar00}`))
          message.reply(`${MyReplyVar00}`).then(() => {
            console.log(`Reply Action ${MyReplyVar00} SUCCEED !`);
          });
        if (result.includes(`${MyTestingReplyVar01}`))
          message.reply(`${MyReplyVar01}`).then(() => {
            console.log(`Reply Action ${MyReplyVar01} SUCCEED !`);
          });
        client.embedGenerator(message,"New incoming message...",client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
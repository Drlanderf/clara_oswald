const { Message } = require("discord.js");
const Guild = require(`../../schemas/guild`);
module.exports = {
  name: "messageCreate",
  /**
   * @param {import("../../bot.js")} client
   * @param {Message} message
   */
  async execute(message, client) {
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    let guildProfile = await Guild.findOne({
      guildId: Guilds,
    });
    const MyTestingReplyVar00 = guildProfile.testingReplyVar00;
    const MyTestingReplyVar01 = guildProfile.testingReplyVar01;
    const MyReplyVar00 = guildProfile.replyVar00;
    const MyReplyVar01 = guildProfile.replyVar01;

    // WARNING CLIENT EVERYTIME THE LAST
    if (message.author.bot) {
      console.warn(`[Event] messageCreate : from another bot, do anything.`);
    } else {
      console.log("[Event] messageCreate : successfully apply");
      try {
        const test = message.content;
        const result = test.toLowerCase();
        switch (result) {
          case MyTestingReplyVar00:
            message.reply(`${MyReplyVar00}`).then(() => {
              console.log(`Reply Action ${MyReplyVar00} SUCCEED !`);
            });
            break;
          case MyTestingReplyVar01:
            message.reply(`${MyReplyVar01}`).then(() => {
              console.log(`Reply Action ${MyReplyVar01} SUCCEED !`);
            });
            break;
          default:
            break;
        }
        //client.embedGenerator(message, "New incoming message...",guildProfile, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
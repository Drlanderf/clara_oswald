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
      console.warn(`[Event] messageCreate from another bot, do anything.`);
    } else {
      console.log("[Event] messageCreate successfully apply");
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
        client.embedGenerator(message, "New incoming message...", client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
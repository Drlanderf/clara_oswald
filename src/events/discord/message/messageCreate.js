const { Message } = require("discord.js");
const chalk = require("chalk");
const Guild = require(`../../../schemas/guild`);
const { sendLogMessage } = require("../../../functions/tools/sendLogMessage");
module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    //This got disabled as it's something that serves no real purpose but I'm not removing it *yet*
    /*
        let guildProfile = await Guild.findOne({
            guildId: message.guild.id,
        });
        const MyTestingReplyVar00 = guildProfile.testingReplyVar00;
        const MyTestingReplyVar01 = guildProfile.testingReplyVar01;
        const MyReplyVar00 = guildProfile.replyVar00;
        const MyReplyVar01 = guildProfile.replyVar01;

        if (message.author.bot) {
            console.warn(`[Event] messageCreate : ${chalk.red("from another bot, do anything.")}`);
        } else {
            console.log(`[Event] messageCreate : ${chalk.cyan("not from a bot, let's do something !")}`);
            try {
                const test = message.content;
                const result = test.toLowerCase();
                switch (result) {
                    case MyTestingReplyVar00:
                        message.reply(`${MyReplyVar00}`).then(() => {
                            //console.log(`[Event] messageCreate : ${chalk.green(`reply action ${MyReplyVar00} SUCCEED !`)}`);
                        });
                        break;
                    case MyTestingReplyVar01:
                        message.reply(`${MyReplyVar01}`).then(() => {
                            //console.log(`[Event] messageCreate : ${chalk.green(`reply action ${MyReplyVar01} SUCCEED !`)}`);
                        });
                        break;
                    default:
                        //console.log(`[Event] messageCreate : ${chalk.red("Oh dear, nothing happened...")}`);
                        break;
                }
                await sendLogMessage(message, "New incoming message...", client);
            } catch (error) {
                console.error(error);
            }
        }*/
  },
};

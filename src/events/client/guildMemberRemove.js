const Discord = require("discord.js");

const MyLeavingChannelID = process.env.LEAVING_CHANNEL;

const LeavingMessages = [
  process.env.MY_LEAVING_MESSAGE00,
  process.env.MY_LEAVING_MESSAGE01,
  process.env.MY_LEAVING_MESSAGE02,
  process.env.MY_LEAVING_MESSAGE03,
  process.env.MY_LEAVING_MESSAGE04,
  process.env.MY_LEAVING_MESSAGE05,
]

//Actif quand une personne quitte le serveur discord.
module.exports = {
  name: "guildMemberRemove",
  /**
   * @param {Discord.GuildMember} member
   * @param {import("../../bot.js")} client
   */
  async execute(member, client) {
    console.log("[Event] guildMemberRemove successfully apply");

    if (!MyLeavingChannelID) {
      console.error('No Leaving Channel configured.');
      return;
    }

    const WelcomeChannel = client.channels.cache.get(MyLeavingChannelID);

    try {
      const n = Math.floor(Math.random() * (LeavingMessages.length - 1));
      const Message = LeavingMessages[n];
//
      WelcomeChannel.send(`<@${member.id}> ${Message}`);
    } catch (error) {
      console.log(error);
    }
  },
};
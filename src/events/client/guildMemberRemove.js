const Discord = require("discord.js");
const Guild = require(`../../schemas/guild`);

module.exports = {
  name: "guildMemberRemove",
  /**
   * @param {Discord.GuildMember} member
   * @param {import("../../bot.js")} client
   */
  async execute(member, client) {

    const Guilds = client.guilds.cache.map((guild) => guild.id);
    let guildProfile = await Guild.findOne({
      guildId: `${Guilds}`,
    });
    const MyLeavingChannelID = guildProfile.guildLeavingChannel;
    const LeavingMessages = [
      guildProfile.customLeavingMessage00,
      guildProfile.customLeavingMessage01,
      guildProfile.customLeavingMessage02,
      guildProfile.customLeavingMessage03,
    ];

    console.log("[Event] guildMemberRemove : successfully apply");

    if (!MyLeavingChannelID) {
      console.error("No Leaving Channel configured.");
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

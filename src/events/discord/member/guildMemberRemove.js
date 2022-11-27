const { GuildMember, Client } = require("discord.js");
const Guild = require(`../../../schemas/guild`);
module.exports = {
  name: "guildMemberRemove",
  /**
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    let guildProfile = await Guild.findOne({
      guildId: member.guild.id,
    });
    const MyLeavingChannelID = guildProfile.guildLeavingChannel;
    const LeavingMessages = [
      guildProfile.customLeavingMessage00,
      guildProfile.customLeavingMessage01,
      guildProfile.customLeavingMessage02,
      guildProfile.customLeavingMessage03,
    ];
    //console.log("[Event] guildMemberRemove : successfully apply");
    if (!MyLeavingChannelID) {
      //console.error(`[${member.guild.id}] No Leaving Channel configured.`);
      return;
    }
    const WelcomeChannel = client.channels.cache.get(MyLeavingChannelID);
    try {
      const n = Math.floor(Math.random() * (LeavingMessages.length - 1));
      const Message = LeavingMessages[n];
      WelcomeChannel.send(`<@${member.id}> ${Message}`);
    } catch (error) {
      console.log(error);
    }
  },
};

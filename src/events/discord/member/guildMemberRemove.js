const { GuildMember, Client } = require("discord.js");
const Guild = require(`../../../schemas/guild`);
module.exports = {
  name: "guildMemberRemove",
  /**
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    /* ------------------------------------------------------------
		Sync to DB
	   ------------------------------------------------------------ */
    let guildProfile = await Guild.findOne({
      guildId: member.guild.id,
    });
    /* ------------------------------------------------------------
		Variables
	   ------------------------------------------------------------ */
    const MyLeavingChannelID = guildProfile.guildLeavingChannel;
    const LeavingMessages = [
      guildProfile.customLeavingMessage00,
      guildProfile.customLeavingMessage01,
      guildProfile.customLeavingMessage02,
      guildProfile.customLeavingMessage03,
    ];
    //console.log("[Event] guildMemberRemove : successfully apply");
    if (!MyLeavingChannelID) {
      console.error(`[${member.guild.id}] No Leaving Channel configured.`);
      return;
    }
    const WelcomeChannel = client.channels.cache.get(MyLeavingChannelID);
    const myGuildCountChannel = guildProfile.guildCountChannel;
    /* ------------------------------------------------------------
              Update the counter
              ID :	channel,
              DATA use : myGuildCountChannel.
         ------------------------------------------------------------ */
    //let channel = client.channels.cache.get(`CHANNEL_ID`); //=> brut version
    let channel = client.channels.cache.get(`${myGuildCountChannel}`); //=>DB version
    if(member.guild.memberCount<1000){
      channel.setName(`👥 ${member.guild.memberCount} membres`);
    } else if (member.guild.memberCount>=1000) {
      let memberCount = member.guild.memberCount/1000;
      channel.setName(`👥 ${memberCount}k membres Discord`);
    } else if (member.guild.memberCount>=1000000) {
      let memberCount = member.guild.memberCount/1000000;
      channel.setName(`👥 ${memberCount}M membres Discord`);
    }
    /* ------------------------------------------------------------
          Try to send the welcome message
       ------------------------------------------------------------ */
    try {
      /* ------------------------------------------------------------
              Send the message to the welcome channel
              ID :	welcomeChannel,
              DATA use : LeavingMessages[], Message.
         ------------------------------------------------------------ */
      console.log("leaving message send ");
      const n = Math.floor(Math.random() * (LeavingMessages.length - 1));
      const Message = LeavingMessages[n];
      WelcomeChannel.send(`<@${member.id}> ${Message}`);
    } catch (error) {
      console.log(error);
    }
  },
};

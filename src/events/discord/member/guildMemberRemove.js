const { GuildMember, Client } = require("discord.js");
const Guild = require(`../../../schemas/guild`);
const {
  getCounterChannelName,
} = require("../../../functions/tools/getCounterChannelName");
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
    //const countChannelName = client.channels.cache.get(`1088547089807581204`); //=> brut version
    const countChannelName = client.channels.cache.get(
      `${myGuildCountChannel}`
    ); //=>DB version
    /* ------------------------------------------------------------
              Update the counter
              ID :	channel,
              DATA use : myGuildCountChannel.
         ------------------------------------------------------------ */
    if (myGuildCountChannel) {
      const newCountName = getCounterChannelName(`${member.guild.memberCount}`);
      countChannelName.setName(newCountName);
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
      const n = Math.floor(Math.random() * (LeavingMessages.length - 1));
      const Message = LeavingMessages[n];
      //WelcomeChannel.send(`<@${member.id}> ${Message}`);
      if (member.partial) {
        member = await member
            .fetch()
            .then((fullMember) => {
              console.log(
                  Date(Date.now()).toString() +
                  " [Event] guildMemberRemove (PARTIAL): member fetched " +
                  "(" +
                  fullMember +
                  " )"
              );
              const msg = WelcomeChannel.send(
                  `<@${member.id}> ${Message}`
              );
              console.log(
                  Date(Date.now()).toString() +
                  " [Event] guildMemberRemove (PARTIAL): successfully finish "+member.user.tag
              );
            })
            .catch((error) => {
              console.log(
                  Date(Date.now()).toString() +
                  " [Event] guildMemberRemove (PARTIAL): Something went wrong when fetching the member: ",
                  error
              );
            });
      } else {
        const msg = await WelcomeChannel.send(
            `<@${member.id}> ${Message}`
        );
        console.log(
            Date(Date.now()).toString() +
            " [Event] guildMemberRemove : successfully finish "+member.user.tag
        );
      }


    } catch (error) {
      console.log(Date(Date.now()).toString() + " [Event] guildMemberRemove : yousk2 :",error);
    }
  },
};

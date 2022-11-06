const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);

module.exports = (client) => {
  client.defaultDBSetup = async (client) => {
    const guildProfile = new Guild({
      _id: mongoose.Types.ObjectId(),
      guildId: client.guilds.cache.get("id"),
      guildName: client.guilds.cache.get("name"),
      guildIcon: client.guilds.cache.get("iconURL")
        ? client.guilds.cache.get("iconURL")
        : "None.",
      guildJoinChannel: "None.",
      guildLeavingChannel: "None.",
      guildAutoLogChannel: "None.",
      guildYoutubeChannel: "None.",
      guildTwitchChannel: "None.",
      roleId00: "None.",
      roleId01: "None.",
      roleId02: "None.",
      roleTwitchNotificationId: "None.",
      roleYoutubeNotificationId: "None.",
      customWelcomeMessage: "None.",
      customLeavingMessage00: "None.",
      customLeavingMessage01: "None.",
      customLeavingMessage02: "None.",
      customLeavingMessage03: "None.",
      twitchChannelName: "None.",
      youtubeChannelId00: "None.",
      testingReplyVar00: "None.",
      replyVar00: "None.",
      testingReplyVar01: "None.",
      replyVar01: "None.",
    });
    await guildProfile.save().catch(console.error);
    console.log(guildProfile);
  };
};

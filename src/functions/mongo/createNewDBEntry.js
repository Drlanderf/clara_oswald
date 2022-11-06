const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
module.exports = (client) => {
  client.createNewDBEntry = async (guildProfile,guild) => {
    guildProfile = new Guild({
      _id: mongoose.Types.ObjectId(),
      guildId: `${guild}`,
      guildName: client.guilds.cache.get(guild).name,
      guildIcon: client.guilds.cache.get(guild).iconURL()
        ? client.guilds.cache.get(guild).iconURL()
        : "None.",
    });
    await guildProfile.save().catch(console.error);
    console.log(guildProfile);
  };
};
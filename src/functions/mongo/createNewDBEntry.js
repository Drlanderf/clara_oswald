const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
async function createNewDBEntry(guildProfile, guild, client) {
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
}
module.exports = { createNewDBEntry };

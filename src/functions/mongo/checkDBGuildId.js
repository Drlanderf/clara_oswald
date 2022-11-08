const { getGuilds } = require("../../functions/tools/getGuilds");
const { createNewDBEntry } = require("../../functions/mongo/createNewDBEntry");
const {
  checkDBFindGuildID,
} = require("../../functions/mongo/checkDBFindGuildID");

async function checkDBGuildId(client) {
  let guildConfigurations = await getGuilds(client);
  for (const guild of guildConfigurations) {
    let guildProfile = await checkDBFindGuildID(guild);
    if (!guildProfile) {
      await createNewDBEntry(guildProfile, guild, client);
    }
  }
}
module.exports = { checkDBGuildId };

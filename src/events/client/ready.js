const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
module.exports = {
  name: "ready",
  async execute(client) {
    const guildConfigurations = await client.getGuilds();
    for (const guild of guildConfigurations) {
      let guildProfile = Guild.findOne({
        guildId: client.guilds.cache.get('id'),
      });
      if (!guildProfile) {
        client.defaultDBSetup(client)
        console.log(guildProfile);
      }
    }
    setInterval(client.pickPresence, 15 * 1000);
    setInterval(client.checkVideoTech, 300 * 1000); //Improve perf
    setInterval(client.checkVideoGaming, 300 * 1000); //Improve perf
    setInterval(client.checkStreamTwitch, 15 * 1000);
    console.log(`o--------------------------------------------o`);
    console.log(`|          Logged into Discord as            |`);
    console.log(`|            ${client.user.tag}               |`);
    console.log(`o--------------------------------------------o`);
    console.log("client getguilds :");
    console.log(client.getGuilds());
  },
};

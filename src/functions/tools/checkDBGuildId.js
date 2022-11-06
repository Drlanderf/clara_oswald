const chalk = require("chalk");
const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
module.exports = (client) => {
  client.checkDBGuildId  = async () => {
    const guildConfigurations = await client.getGuilds();
    for (const guild of guildConfigurations) {
      console.log(
        chalk.cyan(`[Database Check]: Trying to resolve guildId(${guild})...`)
      );
      //console.log(guild);// for debugging
      //console.log(client.guilds.cache.get(guild).name);// for debugging
      let guildProfile = await Guild.findOne({
        guildId: `${guild}`,
      });
      //console.log(guildProfile);// for debugging
      if (!guildProfile) {
        console.log(
          chalk.yellow(`[Database Check] Warning : no entry with ${guild}`)
        );
        console.log(
          chalk.cyan(`[Database Check] : Creating new entry with ${guild}`)
        );
        guildProfile = await new Guild({
          _id: mongoose.Types.ObjectId(),
          guildId: `${guild}`,
          guildName: client.guilds.cache.get(guild).name,
          guildIcon: client.guilds.cache.get(guild).iconURL()
            ? client.guilds.cache.get(guild).iconURL()
            : "None.",
        });
        await guildProfile.save().catch(console.error);
        console.log(
          chalk.green(`[Database Check] : New entry successfully create with :`)
        );
        console.log(guildProfile);
      }
      console.log(chalk.green(`[Database Check] Found : (${guild})`));
    }
  };
};
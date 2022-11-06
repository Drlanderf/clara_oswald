const chalk = require("chalk");

  async function checkDBGuildId(client){
    const guildConfigurations = await client.getGuilds();
    for (const guild of guildConfigurations) {
      console.log(
        chalk.cyan(`[Database Check] Trying to resolve : guildId(${guild})...`)
      );
      let guildProfile = await client.checkDBFindGuildID(guild);
      if (!guildProfile) {
        console.log(
          chalk.yellow(`[Database Check] Warning : no entry with ${guild}`)
        );
        console.log(
          chalk.cyan(`[Database Check] : Creating new entry with ${guild}`)
        );
        console.log(
          chalk.green(`[Database Check] : New entry successfully create with :`)
        );
        await client.createNewDBEntry(guildProfile, guild);
      }
      console.log(chalk.green(`[Database Check] Found : (${guild})`));
    }
  }module.exports= {checkDBGuildId};

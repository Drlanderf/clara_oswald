const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
const chalk = require("chalk");

module.exports = {
  name: "guildCreate",
  once:false,
  async execute(guild,client) {
    console.log(chalk.bgYellow(`[EVENT] guildCreate : Bot join a new discord server...`));
    console.log(chalk.yellow(`Starting the DB check...`));
    client.checkDBGuildId();
  },
};

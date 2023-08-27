const chalk = require("chalk");
module.exports = {
  name: "disconnected",
  execute() {
    console.log(chalk.bgRed("[Database Status]: Disconnected."));
  },
};

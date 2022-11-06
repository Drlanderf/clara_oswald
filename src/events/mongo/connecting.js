const chalk = require("chalk");
module.exports = {
  name: "connecting",
  execute() {
    console.log(chalk.bgCyan("[Database Status]: Connecting..."));
  },
};

const chalk = require("chalk");
module.exports = {
  name: "connected",
  execute() {
    console.log(chalk.bgGreen("[Database Status]: Connected."));
  },
};

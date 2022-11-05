const chalk = require(`chalk`);

module.exports = {
    name: "connected",
    execute() {
        console.log(chalk.cyan("[Database Status]: Connecting..."));
    },
};
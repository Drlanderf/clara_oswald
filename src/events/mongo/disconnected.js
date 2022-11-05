const chalk = require(`chalk`);

module.exports = {
    name: "connected",
    execute() {
        console.log(chalk.red("[Database Status]: Disconnected."));
    },
};
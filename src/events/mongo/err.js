const chalk = require("chalk");
module.exports = {
    name: "connected",
    execute(err) {
        console.log(chalk.red(`An error occurred with the database connection:\n${err}`));
    },
};
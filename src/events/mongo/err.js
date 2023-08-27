const chalk = require("chalk");
module.exports = {
    name: "err",
    execute(err) {
        console.log(chalk.bgRedBright(`An error occurred with the database connection:\n${err}`));
    },
};

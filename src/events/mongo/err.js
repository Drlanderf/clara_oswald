module.exports = {
    name: "err",
    execute(err) {
        console.log(`An error occurred with the database connection:\n${err}`);
    },
};

require("dotenv").config({ path: `${__dirname}/../.env` });
const { BOT_TOKEN, DATABASE_TOKEN } = process.env;
const { Client, Collection } = require("discord.js");
const { connect } = require("mongoose");
const { loadEvents } = require("../src/functions/handlers/handleEvents");

const client = new Client({
    intents: 3276799,
}); // => That will include ALL intents needed to work
console.log(`o----------------------------o`);
console.log(`|   Thanks for using my bot     |`);
client.configs = new Collection();
client.events = new Collection();
client.commands = new Collection();
(async () => {
    try {
        loadEvents(client);
        connect(DATABASE_TOKEN);
        client.login(BOT_TOKEN);
    } catch (e) {
        console.error(e);
    }
})();

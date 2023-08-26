require("dotenv").config({ path: `${__dirname}/../.env` });
const { BOT_TOKEN, DATABASE_TOKEN } = process.env;
const { Client, Collection } = require("discord.js");
const { connect } = require("mongoose");
const { loadEvents } = require("./functions/handlers/handleEvents");
const client = new Client({
  intents: process.argv[3] ? 3276799 : 531,
}); // => That will include ALL the intents - though
console.log(`o-------------------------------o`);
console.log(`|   Thanks for using my bot     |`);
client.configs = new Collection();
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
(async () => {
  try {
    loadEvents(client);
    connect(DATABASE_TOKEN);
    client.login(BOT_TOKEN);
  } catch (e) {
    console.error(e);
  }
})();
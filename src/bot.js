require("dotenv").config();
const { BOT_TOKEN, DATABASE_TOKEN } = process.env;
const {
  Client,
  Collection,
  Interaction,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const { User, Message, GuildMember, ThreadMember } = Partials;
const { connect } = require("mongoose");
const fs = require("fs");
const ascii = require("ascii-table");
const chalk = require("chalk");
const { loadEvents } = require("../src/functions/handlers/handleEvents");

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
}); // => That will include ALL intents/partials needed to work
console.log(`o----------------------------o`);
console.log(`|   Thanks to use my bot     |`);
client.configs = new Collection();
client.events = new Collection();
loadEvents(client).then();
client.commands = new Collection();
client.login(BOT_TOKEN).then();
(async () => {
  await connect(DATABASE_TOKEN).catch(console.error);
})();

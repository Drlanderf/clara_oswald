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

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
}); // => That will include ALL intents/partials needed to work
console.log(`o----------------------------o`);
console.log(`|   Thanks to use my bot     |`);
client.configs = new Collection();
client.events = new Collection();
client.commands = new Collection();
client.commandArray = [];
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
client.handleEvents();
//client.handleCommands();
client.login(BOT_TOKEN).then();
(async () => {
  await connect(DATABASE_TOKEN).catch(console.error);
})();
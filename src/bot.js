require("dotenv").config();
const {BOT_TOKEN,DATABASE_TOKEN} = process.env;
const { Client, Collection} = require("discord.js");
const {connect} = require("mongoose");
const fs = require("fs");
const client = new Client({
  intents:3276799 // => That will include ALL intents
});
client.commands = new Collection();
client.commandArray = [];

client.colour = "";

console.log(`o--------------------------------------------o`);
console.log(`|           Thanks to use my bot             |`);
console.log(`o--------------------------------------------o`);

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
  await connect(DATABASE_TOKEN).catch(console.error)
})();
require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const myToken = process.env.BOT_TOKEN;
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
client.handleCommands();
client.login(myToken).then();

require('dotenv').config();
const { token } = process.env;
const { Discord,Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const Canvas = require("canvas");
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

client.colour = "";

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file)=> file.endsWith('.js'));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);




require('dotenv').config();
const token = process.env.TOKEN;
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: 131071});
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
client.login(token).then(() => console.log("Successfully login !"));
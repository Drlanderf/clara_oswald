require('dotenv').config();
const myToken = process.env.TOKEN;
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const fs = require('fs');
const client = new Client({
    intents: [
        131071,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]});
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
client.login(myToken).then(() => console.log("Successfully login !"));
const { REST } = require("discord.js");
const ascii = require("ascii-table");
async function loadCommands(client){
    const { REST, Routes } = require("discord.js");
    const fs = require("fs");
    const ascii = require("ascii-table");

    const table = new ascii().setHeading("Commands", "Status");

    await client.commands.clear();

    client.commandsArray = [];

    const commandFolders = fs.readdirSync("./src/commands");

    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        await client.commands.set(command.data.name, command);
          client.commandsArray.push(command.data.toJSON());
          table.addRow(command.data.name,`LOADED 🟩`)
      }
    }
    await client.application.commands.set(client.commandsArray);
    return console.log(table.toString(),"\nCommands Loaded");
  }module.exports= {loadCommands};
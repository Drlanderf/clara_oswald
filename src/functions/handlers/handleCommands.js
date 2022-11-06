const { REST, Routes } = require("discord.js");
const { request } = require('undici');
const fs = require("fs");
const Guild = require(`../../schemas/guild`);
const clientId = process.env.CLIENT_ID;
const rest = new REST({
  version: "10",
}).setToken(process.env.BOT_TOKEN);
module.exports = (client) => {
  client.handleCommands = async () => {
      /*await rest.put(Routes.applicationCommands(clientId), { body: [] });
      await rest.put(Routes.applicationGuildCommands(clientId, guild), {
        body: [],
      });*/
      const commandFolders = fs.readdirSync("./src/commands");
      for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`./src/commands/${folder}`)
            .filter((file) => file.endsWith(".js"));
        const { commands, commandArray } = client;
        for (const file of commandFiles) {
          const command = require(`../../commands/${folder}/${file}`);
          await commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          console.log(
              `[Command] ${command.data.name} has been passed through the handler`
          );
        }
      }
      try {
        console.log(`[${client.guilds.cache.get(guild).name}] Started refreshing application (/) commands.`);
        await rest.put(Routes.applicationCommands(clientId, guildConfigurations[0]), {
          body: client.commandArray,
        });
        console.log(`[${client.guilds.cache.get(guild).name}] Successfully reloaded application (/) commands.`);
      } catch (error) {
        console.error(error);
      }
  };
};
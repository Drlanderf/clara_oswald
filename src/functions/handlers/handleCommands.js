const { REST, Routes } = require("discord.js");
const fs = require("fs");
const Guild = require(`../../schemas/guild`);
const clientId = process.env.CLIENT_ID;
//const guildId = process.env.GUILD_ID;
const rest = new REST({
  version: "9",
}).setToken(process.env.BOT_TOKEN);
module.exports = (client) => {
  client.handleCommands = async () => {
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    let guildProfile = await Guild.findOne({
      guildId: Guilds,
    });
    console.log("Handler of Commands successfully apply");
    await rest.put(Routes.applicationCommands(clientId), { body: [] });
    await rest.put(Routes.applicationGuildCommands(clientId, guildProfile.guildId), {
      body: [],
    });
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
          `Command : ${command.data.name} has been passed through the handler`
        );
      }
    }
    try {
      console.log("Started refreshing application (/) commands.");
      await rest.put(Routes.applicationCommands(clientId, guildId), {
        body: client.commandArray,
      });
      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
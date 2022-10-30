const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
module.exports = (client) =>
{
    client.handleCommands = async applicationId =>
    {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders)
        {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file)=> file.endsWith('.js'));
            const { commands, commandArray} = client;
            for (const file of commandFiles)
            {
                const command = require(`../../commands/${folder}/${file}`);
                await commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command : ${command.data.name} has been passed through the handler`);
            }
        }
        const clientId = '1034186318705590392';
        const guildId = '762441206642245672';
        const rest = new REST({ version: "9" }).setToken(process.env.token);
        try  {
            console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationCommands(clientId, guildId), {
                body: client.commandArray,
            })

            console.log("Successfully reloaded application (/) commands.")
        } catch (error) {
            console.error(error);
        }
    };
};
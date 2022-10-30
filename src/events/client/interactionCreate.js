module.exports =
    {
        name: 'interactionCreate',
        async execute(interaction,client)
        {
            if (interaction.isChatInputCommand())
            {
                const { commands } = client;
                const { commandName } = interaction;
                const command = commands.get(commandName);
                if (!command) return;

                try
                {
                    await command.execute(interaction,client);
                } catch (error) {
                    console.error(error)
                    await interaction.reply({
                        content: `Quelque chose d'étrange s'est passé lors de l'éxécution de cette commande...`,
                        ephemeral: true
                    })
                }
            }
            //console.log(`Ready !!! ${client.user.tag} is logged in and online!`);
        }
    }
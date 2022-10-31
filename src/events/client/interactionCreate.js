module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    console.log("Event interactionCreate successfully apply");
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Quelque chose d'étrange s'est passé lors de l'éxécution de cette commande...`,
          ephemeral: true,
        });
      }
    }
  },
};
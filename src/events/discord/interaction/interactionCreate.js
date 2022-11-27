const { ChatInputCommandInteraction, Client } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        let pick = 0;
        let picks = ["reply", "editReply"];
        if (interaction.replied || interaction.deferred) pick = 1;
        await interaction[picks[pick]]({
          content: `Something strange happened while executing this command...`,
          ephemeral: true,
        });
      }
    }
  },
};

const {
  ChatInputCommandInteraction,
  Client,
  InteractionType,
} = require("discord.js");
const { sendInteractionLog } = require("../../../functions/tools/sendInteractionLog");
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
        await sendInteractionLog(commandName, 'Command was invoked!', client)
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
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error(`There is no code for this button`);
      try {
        await button.execute(interaction, client);
        await sendInteractionLog(customId, 'Button was clicked!', client)
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error(`There is no code for this modal`);
      try {
        await modal.execute(interaction, client);
        await sendInteractionLog(customId, 'Modal was submitted!', client)
      } catch (err) {
        console.error(err);
      }
    }
  },
};

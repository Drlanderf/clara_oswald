const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("talkasbot")
    .setDescription("Open a modal to talk as bot"),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId(`talkasbot`)
      .setTitle(`Talk as bot`);
    const textInput = new TextInputBuilder()
      .setCustomId(`talkasbotInput`)
      .setLabel(`Talk as bot input`)
      .setPlaceholder(`Message`)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));
    await interaction.showModal(modal);
  },
};

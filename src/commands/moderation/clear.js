const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete a number of messages in the current channel.")
    .addIntegerOption((option) =>
      option
        .setName(`number`)
        .setDescription(
          `Number.s you want to delete at once. (max 100)`
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    console.log("[Command] clear successfully apply");
    let number = interaction.options.getInteger(`number`);

    if (number >= 1 && number <= 100) {
      await interaction.channel.bulkDelete(number);
      interaction.reply({
        content: `${number} posts have been deleted!`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: `${number} is not included between 1 and 100`,
        ephemeral: true,
      });
    }
  },
};

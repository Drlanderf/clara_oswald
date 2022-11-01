const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Suprime X message dans le salon courrant.")
    .addIntegerOption((option) =>
      option
        .setName(`nombre`)
        .setDescription(
          `Nombre.s que vous souhaitez suprimer d'un coup. (max 100)`
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    console.log("Command clear successfully apply");
    let number = interaction.options.getInteger(`nombre`);

    if (x >= 1 && x >= 100) {
      await interaction.channel.bulkDelete(x);
      interaction.reply({
        content: `${number} message.s ont été suprimé.s!`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: `${number} n'est pas inclus entre 1 et 100`,
        ephemeral: true,
      });
    }
  },
};

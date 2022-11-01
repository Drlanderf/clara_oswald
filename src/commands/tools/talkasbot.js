const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("talkasbot")
    .setDescription(
      "Envoi un message dans le salon comme si c'était le bot qui parlait."
    )
    .addStringOption((option) =>
      option
        .setName(`message`)
        .setDescription(`Indiquez le message.`)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    console.log("Command talkasbot successfully apply");
    let message = interaction.options.getString(`message`);

    if (!message) return;

    interaction.send(`${message}`);
    interaction.reply({
      content: `le message "${message}" a bien été envoyé`,
      ephemeral: true, //
    });
  },
};

const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("talkasbot")
    .setDescription("Send a message as the bot")
    .addStringOption((option) =>
      option
        .setName(`message`)
        .setDescription(`The message you want to send as bot`)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    let message = interaction.options.getString(`message`);

    if (!message) return;

    interaction.channel.send(`${message}`);
    interaction.reply({
      content: `The message "${message}" was sent successfully !`,
      ephemeral: true, //
    });
  },
};

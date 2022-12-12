const { SlashCommandBuilder } = require("discord.js");
const {
  checkStreamTwitch,
} = require("../../functions/social/checkStreamTwitch");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkstreamtwitch")
    .setDescription("Setup the youtube notification for tech video"),
  async execute(interaction, client) {
    await interaction.reply({
      content: `[Command] checkstreamtwitch successfully apply`,
    });
    setInterval(() => checkStreamTwitch(interaction, client), 120 * 1000);
  },
};
const { SlashCommandBuilder } = require("discord.js");
const { checkVideoGaming } = require("../../functions/social/checkVideoGaming");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkvideogaming")
    .setDescription("Setup the youtube notification for tech video"),
  async execute(interaction, client) {
    await interaction.reply({
      content: `[Command] checkvideogaming successfully apply`,
    });
    setInterval(() => checkVideoGaming(interaction, client), 300 * 1000);
  },
};
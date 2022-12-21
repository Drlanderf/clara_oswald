const { SlashCommandBuilder } = require("discord.js");
const { checkVideoTech } = require("../../functions/social/checkVideoTech");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkvideotech")
    .setDescription("Setup the youtube notification for tech video"),
  async execute(interaction, client) {
    await interaction.reply({
      content: `[Command] checkvideotech successfully apply`,
    });
    setInterval(() => checkVideoTech(interaction, client), 120 * 1000);
  },
};

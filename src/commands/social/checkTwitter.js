const { SlashCommandBuilder } = require("discord.js");
const { 
    checkTwitter,
} = require("../../functions/social/checkTwitter");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("checktwitter")
    .setDescription("Setup the Twitter notification for tech updates"),
  async execute(interaction, client) {
    await interaction.reply({
      content: `[Command] checktwitter successfully apply`,
    });
    setInterval(() => checkTwitter(interaction, client), 300 * 1000);
  },
};

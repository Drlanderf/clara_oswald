const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return my ping"),
  async execute(interaction, client) {
    console.log("[Command] ping successfully apply");
    const message = await interaction.deferReply({
      fetchReply: true,
    });
    const newMessage = `API Latency: ${client.ws.ping}\nClient ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
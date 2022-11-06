const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Return an embed"),
  async execute(interaction, client) {
    console.log("[Command] embed successfully apply");
    const embed = new EmbedBuilder()
      .setTitle(`This is an embed title`)
      .setDescription(`This is an AWESOME description !`)
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: `https://www.youtube.com/channel/UCnK7oWn1A7RvKiB19ZIECZg`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(`https://www.youtube.com/channel/UCnK7oWn1A7RvKiB19ZIECZg`)
      .addFields([
        {
          name: `Field 1`,
          value: `Value of field 1`,
          inline: true,
        },
        {
          name: `Field 2`,
          value: `Value of field 2`,
          inline: true,
        },
      ]);
    await interaction.reply({
      embeds: [embed],
    });
  },
};

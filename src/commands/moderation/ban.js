const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban the desired member by deleting X message.s.")
    .addUserOption((option) =>
      option
        .setName(`target`)
        .setDescription(`The member you wish to ban.`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName(`reason`)
        .setDescription(`Indicate the reason for the ban.`)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser(`target`);
    let reason = interaction.options.getString(`reason`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);
    if (!reason) reason = "No reason provided.";
    await member
      .ban({
        deleteMessageDays: 1,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Ban ${user.tag} has been banned!\n(reason: ${reason})`,
      ephemeral: true,
    });
  },
};

const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban le membre souhaité en supprimant X message.s.")
    .addUserOption((option) =>
      option
        .setName(`target`)
        .setDescription(`Le membre que vous souhaitez ban.`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName(`reason`).setDescription(`Indiquez la raison du ban.`)
    ),

  async execute(interaction, client) {
    console.log("Command ban successfully apply");
    const user = interaction.options.getUser(`target`);
    let reason = interaction.options.getString(`reason`);
    //let day = interaction.options.getInteger(`day`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);
    if (!reason) reason = "Aucune raison fournie.";
    await member
      .ban({
        deleteMessageDays: 1,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Ban ${user.tag} a été banni !\n(raison : ${reason})`,
      ephemeral: true,
    });
  },
};

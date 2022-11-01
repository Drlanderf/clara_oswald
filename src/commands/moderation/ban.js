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
    )
    .addIntegerOption(
      (
        option // Optionnel à implémenter !
      ) =>
        option
          .setName(`X`)
          .setDescription(
            `Message.s du membre que vous désirez suprimer. (valeur entre 0 et 7) par défaut, ne suprime aucun messages`
          )
    ),
  async execute(interaction, client) {
    console.log("Command ban successfully apply");
    const user = interaction.options.getUser(`target`);
    let reason = interaction.options.getString(`reason`);
    let day = interaction.options.getInteger(`X`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Aucune raison fournie.";
    if (!day) day = 0;
    //On peut rajouter un message... attention il faut bien l'envoyer avant le ban ! et catch l'erreur si DM sont fermé !

    await member
      .ban({
        deleteMessageDays: day,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Ban ${user.tag} a été banni !\n(raison : ${reason})`,
      ephemeral: true,
    });
  },
};

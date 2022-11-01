const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick le membre souhaité.")
    .addUserOption((option) =>
      option
        .setName(`target`)
        .setDescription(`Le membre que vous souhaitez kick.`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName(`reason`).setDescription(`Indiquez la raison du kick.`)
    ),
  async execute(interaction, client) {
    console.log("Command kick successfully apply");
    const user = interaction.options.getUser(`target`);
    let reason = interaction.options.getString(`reason`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Aucune raison fournie.";
    //On peut rajouter un message... attention il faut bien l'envoyer avant le ban ! et catch l'erreur si DM sont fermé !

    await member.kick(reason).catch(console.error);

    interaction.reply({
      content: `kick ${user.tag} a été kick!\n(raison : ${reason})`,
      ephemeral: true,
    });
  },
};

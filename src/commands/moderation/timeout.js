const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("timeout le membre souhaité durant X.")
    .addUserOption((option) =>
      option
        .setName(`target`)
        .setDescription(`Le membre que vous souhaitez timeout.`)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName(`X`)
        .setDescription(`Minute.s que vous désirez timeout le membre.`)
    )
    .addStringOption((option) =>
      option.setName(`reason`).setDescription(`Indiquez la raison du timeout.`)
    ),
  async execute(interaction, client) {
    console.log("Command timeout successfully apply");
    const user = interaction.options.getUser(`target`);
    let reason = interaction.options.getString(`reason`);
    let time = interaction.options.getInteger(`time`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Aucune raison fournie.";
    if (!time) time = null;

    await member
      .timeout(time == null ? null : time * 60 * 1000, reason)
      .catch(console.error);

    interaction.reply({
      content: `kick ${user.tag} a été timeout!\n(raison : ${reason})`,
      ephemeral: true,
    });
  },
};

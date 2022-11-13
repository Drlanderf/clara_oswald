const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("timeout the member during X.")
        .addUserOption((option) => option.setName(`target`).setDescription(`The member you want timeout.`).setRequired(true))
        .addIntegerOption((option) => option.setName(`time`).setDescription(`Minute.s that you want to timeout the member.`))
        .addStringOption((option) => option.setName(`reason`).setDescription(`Indicate the reason for the timeout.`)),
    async execute(interaction, client) {
        const user = interaction.options.getUser(`target`);
        let reason = interaction.options.getString(`reason`);
        let time = interaction.options.getInteger(`time`);
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (!reason) reason = "No reason provided.";
        if (!time) time = null;

        await member.timeout(time == null ? null : time * 60 * 1000, reason + `\nBy: ${interaction.member.user.id}`).catch(console.error);

        interaction.reply({
            content: `${user.tag} timed out!\n(reason: ${reason})`,
            ephemeral: true,
        });
    },
};

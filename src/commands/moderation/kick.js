const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick the desired member.")
        .addUserOption((option) => option.setName(`target`).setDescription(`The member you want to kick.`).setRequired(true))
        .addStringOption((option) => option.setName(`reason`).setDescription(`Indicate the reason for the kick.`)),
    async execute(interaction, client) {
        const user = interaction.options.getUser(`target`);
        let reason = interaction.options.getString(`reason`);
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (!reason) reason = "No reason provided.";
        await member.kick(reason).catch(console.error);

        interaction.reply({
            content: `kick ${user.tag} was kicked!\n(reason: ${reason})`,
            ephemeral: true,
        });
    },
};

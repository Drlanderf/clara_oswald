const { SlashCommandBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
module.exports = {
    data: new SlashCommandBuilder().setName("database").setDescription("Return information from DB"),
    async execute(interaction, client) {
        let guildProfile = await Guild.findOne({
            guildId: interaction.guild.id,
        });
        if (!guildProfile) {
            guildProfile = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : "None.",
            });
            await guildProfile.save().catch(console.error);
            await interaction.reply({
                content: `Server Name: ${guildProfile.guildName}`,
            });
            console.log(guildProfile);
        } else {
            await interaction.reply({
                content: `Server ID: ${guildProfile.guildId}`,
            });
        }
    },
};

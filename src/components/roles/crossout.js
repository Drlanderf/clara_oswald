module.exports = {
    data: {
        name: `crossout`
    },
    async execute(interaction,client){
        await interaction.member.roles.add("1178793459247759451");
        await interaction.reply({
            content: `Your role has been updated with Crossout`,
            ephemeral: true,
        });
    }
}
module.exports = {
    data: {
        name: `games`
    },
    async execute(interaction,client){
        await interaction.member.roles.add("763762626223145022");
        await interaction.reply({
            content: `Your role has been updated with Games`,
            ephemeral: true,
        });
    }
}
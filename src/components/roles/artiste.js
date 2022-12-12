module.exports = {
    data: {
        name: `artiste`
    },
    async execute(interaction,client){
        await interaction.member.roles.add("764981896072396810");
        await interaction.reply({
            content: `Your role has been updated with Artiste`,
            ephemeral: true,
        });
    }
}
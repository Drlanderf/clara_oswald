module.exports = {
    data: {
        name: `tech`
    },
    async execute(interaction,client){
        await interaction.member.roles.add("763762498989195264");
        await interaction.reply({
            content: `Your role has been updated with Tech`,
            ephemeral: true,
        });
    }
}
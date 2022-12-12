module.exports = {
    data: {
        name: `clan`
    },
    async execute(interaction,client){
        await interaction.member.roles.add("1051660804174381108");
        await interaction.reply({
            content: `Your role has been updated with Clan Warframe`,
            ephemeral: true,
        });
    }
}
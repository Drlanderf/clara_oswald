module.exports = {
    data: {
        name: `sab`
    },
    async execute(interaction,client){
        await interaction.member.roles.add("1208772205371072512");
        await interaction.reply({
            content: `Your role has been updated with Skull and Bones`,
            ephemeral: true,
        });
    }
}
module.exports = {
    data: {
        name: `rules-check`
    },
    async execute(interaction,client){
        await interaction.member.roles.add("762449018726907935");
        await interaction.reply({
            content: `Merci d'avoir lu et approuvé les règles en vigueur, nous vous rappelons que vous pouvez vous tag dans le salon prévu à cet effet <#763763437041614848> <a:sip:1023992524269944932>`,
            ephemeral: true,
        });
    }
}
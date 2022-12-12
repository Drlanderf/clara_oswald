const { checkDBFindGuildID } = require("../../functions/mongo/checkDBFindGuildID");
module.exports = {
    data: {
        name: `notif-yt`
    },
    async execute(interaction,client){
        const guildProfile = await checkDBFindGuildID(interaction.guildId);
        const MyYoutubeRoleID = guildProfile.roleTwitchNotificationId;
        await interaction.member.roles.add(`${MyYoutubeRoleID}`);
        await interaction.reply({
            content: `Your role has been updated with Youtube Notifications`,
            ephemeral: true,
        });
    }
}
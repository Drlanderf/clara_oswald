const { checkDBFindGuildID } = require("../../functions/mongo/checkDBFindGuildID");
module.exports = {
    data: {
        name: `notif-twitch`
    },
    async execute(interaction,client){
        const guildProfile = await checkDBFindGuildID(interaction.guildId);
        const myTwitchRoleID = guildProfile.roleTwitchNotificationId;
        await interaction.member.roles.add(`763807631969615903`);
        await interaction.reply({
            content: `Your role has been updated with Twitch Notifications`,
            ephemeral: true,
        });
    }
}
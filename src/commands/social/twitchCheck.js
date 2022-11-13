const { SlashCommandBuilder } = require("discord.js");
const { checkStreamTwitch } = require("../../functions/social/checkStreamTwitch");
const { checkDBFindGuildID } = require("../../functions/mongo/checkDBFindGuildID");
const { createNewDBEntry } = require("../../functions/mongo/createNewDBEntry");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("twitch-check")
        .setDescription("Setup the twitch  notification")
        .addStringOption((option) =>
            option.setName(`twitch_name`).setDescription("The twitch name can be found after twitch.tv/< twitch_name >").setRequired(true)
        )
        .addStringOption((option) => option.setName(`twitch_notification_role_id`).setDescription(`Twitch notification role ID to ping`).setRequired(true))
        .addStringOption((option) => option.setName(`twitch_channel_id`).setDescription(`The channel where do you want send messages`).setRequired(true)),
    async execute(interaction, client) {
        const myTwitchName = interaction.options.getString(`twitch_name`);
        const myTwitchNotificationRoleId = interaction.options.getString(`twitch_notification_role_id`);
        const myTwitchChannelId = interaction.options.getString(`twitch_channel_id`);

        let guildProfile = await checkDBFindGuildID(interaction.guild.id);
        if (!guildProfile) {
            await createNewDBEntry(guildProfile, interaction.guild.id, client);
        } else {
            await guildProfile.updateOne({ twitchChannelName: myTwitchName }).catch(console.error);
            await guildProfile.save().catch(console.error);
            await guildProfile.updateOne({ guildTwitchChannel: myTwitchChannelId }).catch(console.error);
            await guildProfile.save().catch(console.error);
            await guildProfile.updateOne({ roleTwitchNotificationId: myTwitchNotificationRoleId }).catch(console.error);
            await guildProfile.save().catch(console.error);
        }
        await interaction.reply({
            content: `[Command] checkStreamTwitch successfully apply`,
        });
        setInterval(() => checkStreamTwitch(interaction, client), 120 * 1000);
    },
};

const { SlashCommandBuilder } = require("discord.js");
const { checkVideoTech } = require("../../functions/social/checkVideoTech");
const {
  checkDBFindGuildID,
} = require("../../functions/mongo/checkDBFindGuildID");
const { createNewDBEntry } = require("../../functions/mongo/createNewDBEntry");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube-check")
    .setDescription("Setup the youtube notification")
    .addStringOption((option) =>
      option
        .setName(`youtube_id`)
        .setDescription(`YouTube ID of the channel you want to check`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName(`youtube_notification_role_id`)
        .setDescription(`YouTube notification role ID to ping`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName(`youtube_channel_id`)
        .setDescription(`The channel where do you want send messages`)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const myYoutubeChannelId00 = interaction.options.getString(`youtube_id`);
    const myRoleYoutubeNotificationId = interaction.options.getString(
      `youtube_notification_role_id`
    );
    const myGuildYoutubeChannel =
      interaction.options.getString(`youtube_channel_id`);

    let guildProfile = await checkDBFindGuildID(interaction.guild.id);
    if (!guildProfile) {
      await createNewDBEntry(guildProfile, interaction.guild.id, client);
    } else {
      await guildProfile
        .updateOne({ youtubeChannelId00: myYoutubeChannelId00 })
        .catch(console.error);
      await guildProfile.save().catch(console.error);
      await guildProfile
        .updateOne({ guildYoutubeChannel: myGuildYoutubeChannel })
        .catch(console.error);
      await guildProfile.save().catch(console.error);
      await guildProfile
        .updateOne({ roleYoutubeNotificationId: myRoleYoutubeNotificationId })
        .catch(console.error);
      await guildProfile.save().catch(console.error);
    }
    await interaction.reply({
      content: `[Command] youtubeCheck successfully apply`,
    });
    //checkVideoTech(interaction, client).then();
    setInterval(() => checkVideoTech(interaction, client), 5 * 1000);
  },
};

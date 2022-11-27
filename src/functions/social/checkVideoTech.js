const Parser = require(`rss-parser`);
const { EmbedBuilder } = require("discord.js");
const { checkDBFindGuildID } = require("../mongo/checkDBFindGuildID");
const parser = new Parser();
async function checkVideoTech(interaction, client) {
  const guildProfile = await checkDBFindGuildID(interaction.guildId);
  const MyYoutubeGuildChannelID = guildProfile.guildYoutubeChannel;
  const MyYoutubeRoleID = guildProfile.roleYoutubeNotificationId;
  const MyYoutubeChannelID00 = guildProfile.youtubeChannelId00;
  const data = await parser
    .parseURL(
      `https://youtube.com/feeds/videos.xml?channel_id=${MyYoutubeChannelID00}`
    )
    .catch(console.error);

  if (guildProfile.lastVideo00 !== data.items[0].id) {
    //new video or not sent
    await guildProfile
      .updateOne({ lastVideo00: data.items[0].id })
      .catch(console.error);
    await guildProfile.save().catch(console.error);
    const { title, link, id, author } = data.items[0];
    const embed = new EmbedBuilder({
      title: title,
      url: link,
      timestamp: Date.now(),
      image: {
        url: `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`,
      },
      author: {
        name: author,
        iconURL: `https://bit.ly/3U4TcAQ`,
        url: `https://youtube.com/channel/${MyYoutubeChannelID00}/?sub_confirmation=1`, //UCnK7oWn1A7RvKiB19ZIECZg
      },
      footer: {
        text: client.user.tag,
        iconURL: client.user.displayAvatarURL(),
      },
      color: 8388629,
    });
    try {
      await client.channels.cache.get(MyYoutubeGuildChannelID).send({
        content: `:loudspeaker: Hey <@&${MyYoutubeRoleID}> Regarde une nouvelle vidéo sur la chaine **Tech** !`,
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = { checkVideoTech };

const Parser = require(`rss-parser`);
const { EmbedBuilder } = require("discord.js");
const { checkDBFindGuildID } = require("../mongo/checkDBFindGuildID");
const msg = (role, type) =>
  `:loudspeaker: Hey <@&${role}> regarde\n**Landerf** a sorti une nouvelle vidéo ${type} !`;
const parser = new Parser();
async function checkVideoGaming(interaction, client) {
  const guildProfile = await checkDBFindGuildID(interaction.guildId);
  /**************************************************************************/
  //Property
  const MyYoutubeChannelID01 = process.env.YOUTUBE_CHANNEL_ID01; //ID of the Youtube Channel we want notifications | const MyYoutubeChannelID01 = guildProfile.;=> IN THE FUTURE
  const MyYoutubeGuildChannelID = guildProfile.guildYoutubeChannel; //ID of the channel in discord server
  const MyYoutubeRoleID = guildProfile.roleYoutubeNotificationId; //ID of role notification
  /**************************************************************************/
  //If all prop aren't setup yet do nothing !
  if (!MyYoutubeChannelID01 || !MyYoutubeGuildChannelID || !MyYoutubeRoleID)
    return;
  /**************************************************************************/
  //The function
  const data = await parser
    .parseURL(
      `https://youtube.com/feeds/videos.xml?channel_id=${MyYoutubeChannelID01}`
    )
    .catch(console.error);
  if (guildProfile.lastVideo01 !== data.items[0].id) {
    console.log("new video gaming");
    //new video or not sent
    await guildProfile
      .updateOne({ lastVideo01: data.items[0].id })
      .catch(console.error);
    await guildProfile.save().catch(console.error);
    const { title, link, id, author } = data.items[0];
    /**************************************************************************/
    //Setting up the embed
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
        url: `https://youtube.com/channel/${MyYoutubeChannelID01}/?sub_confirmation=1`,
      },
      footer: {
        text: client.user.tag,
        iconURL: client.user.displayAvatarURL(),
      },
      color: 8388629,
    });
    /**************************************************************************/
    //Trying to send the message
    try {
      await client.channels.cache.get(MyYoutubeGuildChannelID).send({
        embeds: [embed],
        content: msg(MyYoutubeRoleID, "gaming"),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = { checkVideoGaming };

const Parser = require(`rss-parser`);
const { EmbedBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
const MyYoutubeChannelID01 = process.env.YOUTUBE_CHANNEL_ID01;

const parser = new Parser();
async function checkVideoGaming(client) {
  const Guilds = client.guilds.cache.map((guild) => guild.id);
  let guildProfile = await Guild.findOne({
    guildId: Guilds[0],
  });
  const MyYoutubeGuildChannelID = guildProfile.guildYoutubeChannel;
  const MyYoutubeRoleID = guildProfile.roleTwitchNotificationId;
  const guildId = guildProfile.guildId;
  //const MyYoutubeChannelID01 = guildProfile.; //for future
  const data = await parser
    .parseURL(
      `https://youtube.com/feeds/videos.xml?channel_id=${MyYoutubeChannelID01}`
    )
    .catch(console.error);
  if (guildProfile.lastVideo01 !== data.items[0].id) {
    console.log("[videoCheck_Gaming] NEW VIDEO spotted");
    await guildProfile
      .updateOne({ lastVideo01: data.items[0].id })
      .catch(console.error);
    await guildProfile.save().catch(console.error);

    const guild = await client.guilds.fetch(`${guildId}`).catch(console.error);
    const channel = await guild.channels
      .fetch(`${MyYoutubeGuildChannelID}`)
      .catch(console.error);
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
        iconURL: `https://bit.ly/3TRMTkf`,
        url: `https://youtube.com/channel/${MyYoutubeChannelID01}/?sub_confirmation=1`,
      },
      footer: {
        text: client.user.tag,
        iconURL: client.user.displayAvatarURL(),
      },
      color: 8388629,
    });
    try {
      await channel.send({
        embeds: [embed],
        content: `:loudspeaker: Hey <@&${MyYoutubeRoleID}> Regarde une nouvelle vidéo sur la chaine **Gaming** !`,
      });
    } catch (error) {
      console.error(error);
    }
  }
}module.exports={checkVideoGaming};


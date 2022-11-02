const Parser = require(`rss-parser`);
const { EmbedBuilder } = require("discord.js");
const fs = require(`fs`);
require("dotenv").config();
const MyYoutubeChannelID00 = process.env.YOUTUBE_CHANNEL_ID00;
const MyYoutubeGuildChannelID = process.env.YOUTUBE_GUILD_CHANNEL_ID;
const MyYoutubeRoleID = process.env.YOUTUBE_NOTIFICATION_ROLE_ID;
const guildId = process.env.GUILD_ID;
const parser = new Parser();
module.exports = (client) => {
  client.checkVideoTech = async () => {
    const data = await parser
      .parseURL(
        `https://youtube.com/feeds/videos.xml?channel_id=${MyYoutubeChannelID00}`
      )
      .catch(console.error);

    const rawData = fs.readFileSync(`${__dirname}/../../json/videoTech.json`);
    const jsonData = JSON.parse(rawData);

    if (jsonData.id !== data.items[0].id) {
      fs.writeFileSync(
        `${__dirname}/../../json/videoTech.json`,
        JSON.stringify({ id: data.items[0].id })
      );

      const guild = await client.guilds
        .fetch(`${guildId}`)
        .catch(console.error);
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
          iconURL: `https://bit.ly/3U4TcAQ`,
          url: `https://youtube.com/channel/${MyYoutubeChannelID00}/?sub_confirmation=1`, //UCnK7oWn1A7RvKiB19ZIECZg
        },
        footer: {
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        },
        color: 8388629,
      });
      await channel
        .send({
          embeds: [embed],
          content: `:loudspeaker: Hey <@&${MyYoutubeRoleID}> 
Regarde une nouvelle vidéo sur la chaine **Tech** !`,
        })
        .catch(console.error);
    }
  };
};
const Parser = require(`rss-parser`);
const { EmbedBuilder } = require("discord.js");
const fs = require(`fs`);
require("dotenv").config();
const MyYoutubeChannelID01 = process.env.YOUTUBE_CHANNEL_ID01;
const MyYoutubeGuildChannelID = process.env.YOUTUBE_GUILD_CHANNEL_ID;
const MyYoutubeRoleID = process.env.YOUTUBE_NOTIFICATION_ROLE_ID;
const guildId = process.env.GUILD_ID;
const parser = new Parser();
module.exports = (client) => {
  client.checkVideoGaming = async () => {
    console.log("Video checking for Gaming every 30 sec");
    const data = await parser
      .parseURL(
        `https://youtube.com/feeds/videos.xml?channel_id=${MyYoutubeChannelID01}`
      )
      .catch(console.error);

    const rawData = fs.readFileSync(`${__dirname}/../../json/videoGaming.json`);
    const jsonData = JSON.parse(rawData);
    console.log("Test if new video Gaming or not");
    if (jsonData.id !== data.items[0].id) {
      console.log("NEW Gaming VIDEO spot");
      fs.writeFileSync(
        `${__dirname}/../../json/videoGaming.json`,
        JSON.stringify({ id: data.items[0].id })
      );

      const guild = await client.guilds
        .fetch(`${guildId}`)
        .catch(console.error);
      const channel = await guild.channels
        .fetch(`${MyYoutubeGuildChannelID}`)
        .catch(console.error);
      const { title, link, id, author } = data.items[0];
      console.log("Creating the embed");
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
          content: `:loudspeaker: Hey <@&${MyYoutubeRoleID}> 
Regarde une nouvelle vidéo sur la chaine **Gaming** !`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
};

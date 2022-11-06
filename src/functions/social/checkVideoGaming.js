const Parser = require(`rss-parser`);
const { EmbedBuilder } = require("discord.js");
const fs = require(`fs`);
const Guild = require(`../../schemas/guild`);
const MyYoutubeChannelID01 = process.env.YOUTUBE_CHANNEL_ID01;

const parser = new Parser();
module.exports = (client) => {
  client.checkVideoGaming = async () => {
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    let guildProfile = await Guild.findOne({
      guildId: Guilds[0],
    });
    const MyYoutubeGuildChannelID = guildProfile.roleYoutubeNotificationId;
    const MyYoutubeRoleID = guildProfile.roleTwitchNotificationId;
    const guildId = guildProfile.guildId;

    //console.log("videoCheck_Gaming : checking every 30 sec");
    const data = await parser
      .parseURL(
        `https://youtube.com/feeds/videos.xml?channel_id=${MyYoutubeChannelID01}`
      )
      .catch(console.error);

    const rawData = fs.readFileSync(`${__dirname}/../../json/videoGaming.json`);
    const jsonData = JSON.parse(rawData);
    //console.log("videoCheck_Gaming : Test if new video Gaming or not...");
    if (jsonData.id !== data.items[0].id) {
      /*Warning, put everytime the last video ID for not spamming*/
      console.log("videoCheck_Gaming : NEW VIDEO spotted");
      fs.writeFileSync(
        //
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
      //console.log("videoCheck_Gaming : Creating the embed...");
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
      //console.log("videoCheck_Gaming : Embed successfully Created !");
      try {
        //console.log("videoCheck_Gaming : Sending the message...");
        await channel.send({
          embeds: [embed],
          content: `:loudspeaker: Hey <@&${MyYoutubeRoleID}> Regarde une nouvelle vidéo sur la chaine **Gaming** !`,
        });
        //console.log("videoCheck_Gaming : Message successfully sended !");
      } catch (error) {
        console.error(error);
      }
    }
    //else console.log("videoCheck_Gaming : Most recently video have been send");
    //console.log("videoCheck_Gaming : checking finish, restart in 30sec");
  };
};
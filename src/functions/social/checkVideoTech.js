const Parser = require(`rss-parser`);
const { EmbedBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
const parser = new Parser();
module.exports = (client) => {
  client.checkVideoTech = async () => {
      const Guilds = client.guilds.cache.map((guild) => guild.id);
      let guildProfile = await Guild.findOne({
        guildId: Guilds[0],
      });
      const MyYoutubeGuildChannelID = guildProfile.guildYoutubeChannel;
      const MyYoutubeRoleID = guildProfile.roleTwitchNotificationId;
      const guildId = guildProfile.guildId;
      const MyYoutubeChannelID00 = guildProfile.youtubeChannelId00;
      const data = await parser
        .parseURL(
          `https://youtube.com/feeds/videos.xml?channel_id=${MyYoutubeChannelID00}`
        )
        .catch(console.error);
      //console.log("videoCheck_Tech : Test if new video  tech or not");
      if (guildProfile.lastVideo00 !== data.items[0].id) {
        /*Warning, put everytime the last video ID for not spamming*/
        console.log("videoCheck_Tech : NEW VIDEO spotted");
        await guildProfile
          .updateOne({ lastVideo00: data.items[0].id })
          .catch(console.error);
        await guildProfile.save().catch(console.error);

        const guild = await client.guilds
          .fetch(`${guildId}`)
          .catch(console.error);
        const channel = await guild.channels
          .fetch(`${MyYoutubeGuildChannelID}`)
          .catch(console.error);
        const { title, link, id, author } = data.items[0];
        //console.log("videoCheck_Tech : Creating the embed...");
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
        //console.log("videoCheck_Tech : Embed successfully Created !");
        try {
          //console.log("videoCheck_Tech : Sending the message...");
          await channel.send({
            embeds: [embed],
            content: `:loudspeaker: Hey <@&${MyYoutubeRoleID}> Regarde une nouvelle vidéo sur la chaine **Tech** !`,
          });
          //console.log("videoCheck_Tech : Message successfully sended !");
        } catch (error) {
          console.error(error);
        }
      }
      //else console.log("videoCheck_Tech : Most recently video have been send");
      //console.log("videoCheck_Tech : checking finish, restart in 30sec");
    };
};

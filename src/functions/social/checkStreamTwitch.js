const fetch = require("node-superfetch");
const { EmbedBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
async function checkStreamTwitch(client) {
  const Guilds = client.guilds.cache.map((guild) => guild.id);
  let guildProfile = await Guild.findOne({
    guildId: Guilds[0],
  });

  const myTwitchChannelName = guildProfile.twitchChannelName;
  const myTwitchGuildChannelID = guildProfile.guildTwitchChannel;
  const myTwitchRoleID = guildProfile.roleTwitchNotificationId;

  const uptime = await fetch.get(
    `https://decapi.me/twitch/uptime/${myTwitchChannelName}`
  );
  const avatar = await fetch.get(
    `https://decapi.me/twitch/avatar/${myTwitchChannelName}`
  );
  const viewers = await fetch.get(
    `https://decapi.me/twitch/viewercount/${myTwitchChannelName}`
  );
  const title = await fetch.get(
    `https://decapi.me/twitch/title/${myTwitchChannelName}`
  );
  const game = await fetch.get(
    `https://decapi.me/twitch/game/${myTwitchChannelName}`
  );

  const twitch = require("../../schemas/twitchSchema");
  let data = await twitch.findOne({
    user: myTwitchChannelName,
    title: title.body,
  });

  if (uptime.body !== `${myTwitchChannelName} is offline`) {
    //setting up the embed for message
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${myTwitchChannelName}`,
        iconURL: `${avatar.text}`,
        url: `https://www.twitch.tv/${myTwitchChannelName}`,
      })
      .setTitle(`${title.body}`)
      .setThumbnail(`${avatar.body}`)
      .setURL(`https://www.twitch.tv/${myTwitchChannelName}`)
      .addFields([
        {
          name: `Jeu`,
          value: `${game.body}`,
          inline: true,
        },
        {
          name: `Viewers`,
          value: `${viewers.body}`,
          inline: true,
        },
      ])
      .setImage(
        `https://static-cdn.jtvnw.net/previews-ttv/live_user_${myTwitchChannelName}-620x378.jpg`
      )
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setColor("Purple");
    if (!data) {
      const newdata = new twitch({
        user: myTwitchChannelName,
        title: `${title.body}`,
      });
      /*************************************/
      /*     trying to send the message    */
      /*************************************/
      try {
        await client.channels.cache.get(`${myTwitchGuildChannelID}`).send({
          embeds: [embed],
          content: `:loudspeaker: Hey <@&${myTwitchRoleID}> Regarde , **${myTwitchChannelName}** est en live !\nhttps://www.twitch.tv/${myTwitchChannelName}`,
        });
      } catch (error) {
        console.error(error);
      }

      return await newdata.save();
    }
    if (data.title === `${title.body}`) return;

    /*************************************/
    /*     trying to send the message    */
    /*************************************/
    try {
      await client.channels.cache.get(`${myTwitchGuildChannelID}`).send({
        embeds: [embed],
        content: `:loudspeaker: Hey <@&${myTwitchRoleID}> Regarde , **${myTwitchChannelName}** est en live !\nhttps://www.twitch.tv/${myTwitchChannelName}`,
      });
    } catch (error) {
      console.error(error);
    }

    await twitch.findOneAndUpdate(
      {
        user: myTwitchChannelName,
      },
      { title: title.body }
    );
  }
}module.exports= {checkStreamTwitch};

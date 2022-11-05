const fetch = require("node-superfetch");
const { EmbedBuilder } = require("discord.js");
const myTwitchChannelName = process.env.TWITCH_CHANNEL_NAME;
const myTwitchGuildChannelID = process.env.TWITCH_GUILD_CHANNEL_ID;
const myTwitchRoleID = process.env.TWITCH_NOTIFICATION_ROLE_ID;
const guildId = process.env.GUILD_ID;
module.exports = (client) => {
  client.checkStreamTwitch = async () => {
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

    if (uptime.body !== `${myTwitchChannelName} is offline`) {
      /*********************************************/
      /*     setup the message for notification    */
      /*********************************************/
      //Setup the embed for message
      const embed = new EmbedBuilder({
        title: `${title.text}`,
        timestamp: Date.now(),
        image: {
          url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${myTwitchChannelName}-620x378.jpg`,
        },
        author: {
          name: `${myTwitchChannelName}`,
          iconURL: `${avatar.text}`,
          url: `https://www.twitch.tv/${myTwitchChannelName}`,
        },
        footer: {
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        },
        color: 8388629,
      })
        .setThumbnail(`${avatar.text}`)
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
        .setColor("Purple");
      //Setup the guild for message
      const guild = await client.guilds
        .fetch(`${guildId}`)
        .catch(console.error);
      //Setup the channel for message
      const channel = await guild.channels
        .fetch(`${myTwitchGuildChannelID}`)
        .catch(console.error);

      /*************************************/
      /*     trying to send the message    */
      /*************************************/
      try {
        await channel.send({
          embeds: [embed],
          content: `:loudspeaker: Hey <@&${myTwitchRoleID}> Regarde , **${myTwitchChannelName}** est en live !`,
        });
      } catch (error) {
        console.error(error);
      }
      temp = `${myTwitchChannelName} is offline`;
    }
  };
};

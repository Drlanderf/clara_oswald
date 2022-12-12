const fetch = require("node-superfetch");
const { EmbedBuilder } = require("discord.js");
const { checkDBFindGuildID } = require("../mongo/checkDBFindGuildID");
const msg = (role, username) =>
  `:loudspeaker: Hey <@&${role}> look\n**${username}** is live!\nhttps://www.twitch.tv/${username}`;
async function checkStreamTwitch(interaction, client) {
  const guildProfile = await checkDBFindGuildID(interaction.guildId);
  /**************************************************************************/
  const myTwitchChannelName = guildProfile.twitchChannelName; //Name of Streamer we want to follow
  const myTwitchGuildChannelID = guildProfile.guildTwitchChannel; //ID of the channel in discord server
  const myTwitchRoleID = guildProfile.roleTwitchNotificationId; //ID of role notification
  /**************************************************************************/
  //If all prop aren't setup yet do nothing !
  if (!myTwitchChannelName || !myTwitchGuildChannelID || !myTwitchRoleID)
    return;
  /**************************************************************************/
  //The function
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
      const newData = new twitch({
        user: myTwitchChannelName,
        title: `${title.body}`,
      });
      /**************************************************************************/
      //Trying to send the message 1
      try {
        await client.channels.cache.get(myTwitchGuildChannelID).send({
          embeds: [embed],
          content: msg(myTwitchRoleID, myTwitchChannelName),
        });
      } catch (error) {
        console.error(error);
      }

      return await newData.save();
    }
    if (data.title === `${title.body}`) return;
    /**************************************************************************/
    //Trying to send the message 2
    try {
      await client.channels.cache.get(myTwitchGuildChannelID).send({
        embeds: [embed],
        content: msg(myTwitchRoleID, myTwitchChannelName),
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
}
module.exports = { checkStreamTwitch };

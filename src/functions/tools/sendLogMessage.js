const { EmbedBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
async function sendLogMessage(message, title, client) {
  let guildProfile = await Guild.findOne({
    guildId: message.guild.id,
  });
  const LogChannelID = guildProfile.guildAutoLogChannel;
  if (!LogChannelID) return;
  const logChannel = client.channels.cache.get(`${LogChannelID}`);
  if (!logChannel) return;
  const embed = new EmbedBuilder()
    .setTitle(`${title}`)
    .setAuthor({
      iconURL: message.author.displayAvatarURL(),
      name: message.author.tag,
    })
    .setDescription(`${message.content}`)
    .setColor("Random")
    .setTimestamp(Date.now())
    .setFooter({
      iconURL: client.user.displayAvatarURL(),
      text: client.user.tag,
    });
  try {
    logChannel.send({
      embeds: [embed],
    });
  } catch (e) {
    console.error(
      `Could not send message to log channel in guild: ${message.guild.id}`
    );
    console.error(e);
  }
}
module.exports = { sendLogMessage };

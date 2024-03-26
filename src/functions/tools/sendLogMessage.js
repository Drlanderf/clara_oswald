const { Client, EmbedBuilder, Message, AttachmentBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
/**
 * 
 * @param {Message} message 
 * @param {string} title 
 * @param {Client} client 
 * @param {Message} oldMessage 
 * @returns 
 */
async function sendLogMessage(message, title, client, oldMessage) {
  if (oldMessage.author.bot || message.author.bot) return; //filter out bots from logs
  let guildProfile = await Guild.findOne({
    guildId: message.guild.id,
  });
  const LogChannelID = guildProfile.guildAutoLogChannel;
  if (!LogChannelID) return;
  const logChannel = client.channels.cache.get(`${LogChannelID}`);
  if (!logChannel) return;

  let description = oldMessage
    ? `Original Message:\n${oldMessage.content}\n\nEdited Message:\n${message.content}`
    : `${message.content}`;
  let embed;
  if (description.length > 4000) {
    // Attach file if description is too long
    const attachment = new AttachmentBuilder(Buffer.from(description), "log.txt");
    embed = new EmbedBuilder()
      .setTitle(`${title}`)
      .setAuthor({
        iconURL: message.author.displayAvatarURL(),
        name: message.author.tag,
      })
      .setDescription("Too long of a response. Check the attached log.")
      .setColor("Random")
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      });
    try {
      logChannel.send({
        embeds: [embed],
        files: [attachment],
      });
    } catch (e) {
      console.error(
        `Could not send message to log channel in guild: ${message.guild.id}`
      );
      console.error(e);
    }
  } else {
    // Send the message normally if description is within the limit
    embed = new EmbedBuilder()
      .setTitle(`${title}`)
      .setAuthor({
        iconURL: message.author.displayAvatarURL(),
        name: message.author.tag,
      })
      .setDescription(description)
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
}
module.exports = { sendLogMessage };

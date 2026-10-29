const { Client, EmbedBuilder,  } = require("discord.js");
const Guild = require(`../../schemas/guild`);
/**
 * 
 * @param {string} interaction The commandName or customId of the specific interaction used
 * @param {string} title 
 * @param {Client} client 
 * @returns 
 */
async function sendInteractionLog(interaction, title, client) {
   //No need to filter out bots due to bots not having the ability to use interactions.
  let guildProfile = await Guild.findOne({
    guildId: interaction.guild.id,
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
      .setDescription(interaction + ` was used`)
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

module.exports = { sendInteractionLog };

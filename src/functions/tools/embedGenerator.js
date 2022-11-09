const { EmbedBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
async function embedGenerator(message, title, client){
    let guildProfile = await Guild.findOne({
        guildId: message.guild.id,
    });
    const LogChannelID = guildProfile.guildAutoLogChannel;
    const logChannel = client.channels.cache.get(`${LogChannelID}`);
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
    logChannel.send({
      embeds: [embed],
    });
  }module.exports={embedGenerator};

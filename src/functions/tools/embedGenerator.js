const { EmbedBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
module.exports = (client) => {
  client.embedGenerator = async (message, title, client) => {
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    let guildProfile = await Guild.findOne({
      guildId: Guilds[0],
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
  };
};

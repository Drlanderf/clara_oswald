const {EmbedBuilder} = require("discord.js");
require("dotenv").config();
const LogChannelID = process.env.CHANNEL_AUTOLOG_ID;
module.exports = (client) => {
    client.embedGenerator = async (message,title, client) => {
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
    }
};
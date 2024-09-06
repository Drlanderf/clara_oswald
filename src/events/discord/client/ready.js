const ascii = require("ascii-table");
const {loadCommands} = require("../../../functions/handlers/handleCommands");
const {
    loadComponents,
} = require("../../../functions/handlers/handleComponents");
const {checkDBGuildId} = require("../../../functions/mongo/checkDBGuildId");
const {pickPresence} = require("../../../functions/tools/pickPresence");
/*const { checkVideoTech } = require("../../../functions/social/checkVideoTech");
const { checkStreamTwitch } = require("../../../functions/social/checkStreamTwitch");
const { checkVideoGaming } = require("../../../functions/social/checkVideoGaming");*/
const {EmbedBuilder, Embed} = require("discord.js");
module.exports = {
    name: "ready",
    async execute(client) {
        const table = new ascii().setHeading("Logged into Discord as");
        table.addRow(`${client.user.tag} - ${client.user.id}`);
        console.log(table.toString());
        await loadCommands(client);
        await checkDBGuildId(client);
        await pickPresence(client);
        await loadComponents(client);
        /* ------------------------------------------------------------
            Sync all member with the cache of the bot
           ------------------------------------------------------------ */
        client.guilds.cache.forEach((guild) => {
            guild.members
                .fetch()
                .then(() =>
                    console.log(
                        Date(Date.now()).toString() +
                        "[Event] Ready : Fetching members for guild " +
                        guild.name
                    )
                )
                .catch(console.error);
        });
        setInterval(() => pickPresence(client), 15 * 1000);
        //setInterval(() => checkStreamTwitch(interaction, client), 120 * 1000);//to fix it
        //setInterval(() => checkVideoTech(interaction, client), 60 * 1000);//to fix it
        //setInterval(() => checkVideoGaming(interaction, client), 60 * 1000);//to fix it

        /* ------------------------------------------------------------
            All the distube events
           ------------------------------------------------------------ */
      const status = queue =>
          `Volume: \`${queue.volume}%\` |  Filter: \`${queue.filters.names.join(', ') || 'Inactive'}\` | Repeat: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Track') : 'Off'
          }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
      client.distube
          .on('playSong', (queue, song) =>
              queue.textChannel.send({
                embeds: [new EmbedBuilder().setColor('Random')
                    .setDescription(`🎶 | Playing: \`${song.name}\` - \`${song.formattedDuration}\`\nFrom: ${song.user
                    }\n${status(queue)}`)]
              })
          )
          .on('addSong', (queue, song) =>
              queue.textChannel.send(
                  {
                    embeds: [new EmbedBuilder().setColor('Random')
                        .setDescription(`🎶 | Added \`${song.name}\` - \`${song.formattedDuration}\` to queue by: ${song.user}`)]
                  }
              )
          )
          .on('addList', (queue, playlist) =>
              queue.textChannel.send(
                  {
                    embeds: [new EmbedBuilder().setColor('Random')
                        .setDescription(`🎶 | Added from \`${playlist.name}\` : \`${playlist.songs.length
                        } \` queue tracks; \n${status(queue)}`)]
                  }
              )
          )
          .on('error', (channel, e) => {
            if (channel) channel.send(`⛔ | Error: ${e.toString().slice(0, 1974)}`)
            else console.error(e)
          })
          .on('empty', channel => channel.send({
            embeds: [new EmbedBuilder().setColor("Red")
                .setDescription('⛔ | The voice channel is empty! Leaving the channel...')]
          }))
          .on('searchNoResult', (message, query) =>
              message.channel.send(
                  {
                    embeds: [new EmbedBuilder().setColor("Red")
                        .setDescription('`⛔ | No results found for: \`${query}\`!`')]
                  })
          )
          .on('finish', queue => queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor('Random')
                .setDescription('🏁 | The queue is finished!')]
          }))
  },
};

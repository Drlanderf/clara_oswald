const ascii = require("ascii-table");
const { loadCommands } = require("../../../functions/handlers/handleCommands");
const {
  loadComponents,
} = require("../../../functions/handlers/handleComponents");
const { checkDBGuildId } = require("../../../functions/mongo/checkDBGuildId");
const { pickPresence } = require("../../../functions/tools/pickPresence");
/*const { checkVideoTech } = require("../../../functions/social/checkVideoTech");
const { checkStreamTwitch } = require("../../../functions/social/checkStreamTwitch");
const { checkVideoGaming } = require("../../../functions/social/checkVideoGaming");*/
const { EmbedBuilder } = require("discord.js");
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
    const status = (queue) =>
      `Volume: \`${queue.volume}%\` \n Filter: \`${
        queue.filters.names.join(", ") || "Off"
      }\` \n Loop: \`${
        queue.repeatMode
          ? queue.repeatMode === 2
            ? "All Queue"
            : "This Song"
          : "Off"
      }\` \n Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
    client.distube
      .on("playSong", (queue, song) => {
        try {
          queue.textChannel.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Green")
                .setDescription(
                  `🎶 | Lecture de \`${song.name}\` - \`${song.formattedDuration}\``
                )
                .addFields([
                  {
                    name: `Infos :`,
                    value: `${status(queue)}`,
                    inline: true,
                  },
                  {
                    name: `Demandé par :`,
                    value: `${song.user}`,
                    inline: true,
                  },
                ]),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      })
      .on("addSong", (queue, song) => {
        try {
          queue.textChannel.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Green")
                .setDescription(
                  `🎶 | Ajout de ${song.name} - \`${song.formattedDuration}\``
                )
                .addFields([
                  {
                    name: `Demandé par :`,
                    value: `${song.user}`,
                    inline: true,
                  },
                ]),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      })
      .on("addList", (queue, playlist) => {
        try {
          queue.textChannel.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Green")
                .setDescription(
                  `🎶 | Ajout de la playlist \`${playlist.name}\` (${playlist.songs.length} musiques) à la liste de lecture`
                )
                .addFields([
                  {
                    name: `Infos`,
                    value: `${status(queue)}`,
                    inline: true,
                  },
                ]),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      })
      .on("error", (channel, e) => {
        try {
          if (channel)
            channel.send(
              `⛔ | An error encountered: ${e.toString().slice(0, 1974)}`
            );
          else console.error(e);
        } catch (e) {
          console.error(e);
        }
      })
      .on("empty", (queue) => {
        try {
          queue.textChannel.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setDescription(
                  "⛔ | Je me sens seul.e dans le salon vocal, je quitte le salon vocal..."
                ),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      })
      .on("searchNoResult", (message, query) => {
        try {
          message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setDescription(`⛔ | Aucun résultat trouvé pour : ${query}!`),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      })
      .on("finish", (queue) => {
        try {
          queue.textChannel.send({
            embeds: [
              new EmbedBuilder()
                .setColor("Green")
                .setDescription("🏁 | Liste de lecture terminée!"),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      });
  },
};

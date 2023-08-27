const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    VoiceChannel,
    GuildEmoji,
} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("Système de musique complet.")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("play")
                .setDescription("Joue une musique.")
                .addStringOption((option) =>
                    option
                        .setName("query")
                        .setDescription("Recherche une musique.")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("volume")
                .setDescription("Ajustez le volume de la musique.")
                .addIntegerOption((option) =>
                    option
                        .setName("percent")
                        .setDescription("10 = 10% | 100 = 100%")
                        .setMinValue(1)
                        .setMaxValue(100)
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("settings")
                .setDescription("Sélectionnez une option.")
                .addStringOption((option) =>
                    option
                        .setName("options")
                        .setDescription("Sélectionnez une option.")
                        .setRequired(true)
                        .addChoices(
                            { name: "queue", value: "queue" },
                            { name: "skip", value: "skip" },
                            { name: "pause", value: "pause" },
                            { name: "resume", value: "resume" },
                            { name: "stop", value: "stop" }
                        )
                )
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;

        const subcommand = options.getSubcommand();
        const query = options.getString("query");
        const volume = options.getInteger("percent");
        const option = options.getString("options");
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if (!voiceChannel) {
            embed.setColor("Red");
            embed.setTitle("⛔ Erreur");
            embed
                .setDescription(
                    "Vous devez être dans un salon vocal pour utiliser cette commande."
                )
                .setFooter({
                    text: `Powered by Distube`,
                });
            return interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
        if (!member.voice.channelId === guild.members.me.voice.channelId) {
            embed.setColor("Yellow");
            embed.setTitle("⚠️ Attention");
            embed.setDescription(
                "Vous devez être dans le même salon vocal que moi pour utiliser cette commande."
            );
            embed
                .addFields([
                    {
                        name: `Salon vocal actuel :`,
                        value: `<#${guild.members.me.voice.channelId}>`,
                        inline: true,
                    },
                ])
                .setFooter({
                    text: `Powered by Distube`,
                });
            return interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }

        try {
            switch (subcommand) {
                case "play":
                    client.distube.play(voiceChannel, query, {
                        textChannel: channel,
                        member: member,
                    });
                    return await interaction.reply({
                        content: "⏱️ Recherche en cours...",
                        ephemeral: true,
                    });
                case "volume":
                    client.distube.setVolume(voiceChannel, volume);
                    return await interaction.reply({
                        content: `🔊 Le volume a été réglé à ${volume}%`,
                        ephemeral: true,
                    });
                case "settings":
                    const queue = await client.distube.getQueue(voiceChannel);
                    if (!queue) {
                        embed.setColor("Red");
                        embed.setTitle("⛔ Erreur");
                        embed
                            .setDescription(
                                "Aucune musique n'est en cours sur la piste de lecture."
                            )
                            .setFooter({
                                text: `Powered by Distube`,
                            });
                        return await interaction.reply({
                            embeds: [embed],
                            ephemeral: true,
                        });
                    }
                    switch (option) {
                        case "skip":
                            await queue.skip();
                            embed
                                .setColor("Blue")
                                .setDescription("⏭️ La musique a été passée.")
                                .setFooter({
                                    text: `Powered by Distube`,
                                });
                            return await interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        case "stop":
                            await queue.stop();
                            embed
                                .setColor("Red")
                                .setTitle("⏹️ La piste de lecture a été arrêtée.")
                                .setFooter({
                                    text: `Powered by Distube`,
                                });
                            return await interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        case "pause":
                            await queue.pause();
                            embed
                                .setColor("Orange")
                                .setTitle("⏸️ La musique a été mise en pause.")
                                .setFooter({
                                    text: `Powered by Distube`,
                                });
                            return await interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        case "resume":
                            await queue.resume();
                            embed
                                .setColor("Green")
                                .setTitle("⏯️ La musique a été relancée.")
                                .setFooter({
                                    text: `Powered by Distube`,
                                });
                            return await interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        case "queue":
                            embed
                                .setColor("Purple")
                                .setTitle(
                                    "📜 Voici la liste des musiques en cours de lecture :"
                                )
                                .setDescription(
                                    `${queue.songs.map(
                                        (song, id) =>
                                            `\n**${id + 1}.** ${song.name} -\`${
                                                song.formattedDuration
                                            }\``
                                    )}`
                                )
                                .setFooter({
                                    text: `Powered by Distube`,
                                });
                            return await interaction.reply({
                                embeds: [embed],
                            });
                    }
            }
        } catch (err) {
            console.log(err);
            embed
                .setColor("Red")
                .setTitle("⛔ | Quelque chose d'étrange s'est produit...")
                .setFooter({
                    text: `Powered by Distube`,
                });
            return interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    },
};

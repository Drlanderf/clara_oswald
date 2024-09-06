const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji} = require("discord.js");
const client = require("../../index");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription('Music System')
        .addSubcommand((subcommand) => subcommand
            .setName('play')
            .setDescription('Play a song')
            .addStringOption((option) => option
                .setName('query')
                .setDescription('Specify the name or URL')
                .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('Volume')
            .setDescription('Adjust the Volume')
            .addNumberOption((option) => option
                .setName('percentage')
                .setDescription('Adjust volume in appropriate units: 10 = 10%')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('Options')
            .setDescription('Options for music system')
            .addNumberOption((option) => option
                .setName('options')
                .setDescription('Select music options')
                .setRequired(true)
                .addChoices({name: 'queue', value: 'queue'}, {name: 'skip', value: 'skip'}, {
                    name: 'resume',
                    value: 'resume'
                }, {name: 'stop', value: 'stop'}, {name: 'loop-queue', value: 'loopqueue'}, {
                    name: 'loop-all',
                    value: 'loopall'
                }, {name: 'autoplay', value: 'autoplay'},))), async execute(interaction, client) {
        const {options, member, guild, channel} = interaction;
        const subcommand = options.getSubcommand();
        const query = options.getString(`queue`);
        const volume = options.getNumber(`percentage`);
        const option = options.getString(`options`);
        const voiceChannel = member.voice.channel;
        const embed = new EmbedBuilder()

        if (!voiceChannel) {
            embed.setDescription('You must be in a voice channel').setColor('Red');
            return interaction.reply({embeds: [embed]});

            if (!member.voice.channelId == guild.members.me.voice.channelId) {
                embed.setDescription(`Already in use in <#${guild.members.me.voice.channelId}>`).setColor('Red');
                return interaction.reply({embeds: [embed]});
            }

            try {

                switch (subcommand) {
                    case 'play':
                        client.distube.play(voiceChannel, query, {textChannel: channel, member: member});
                        return interaction.reply({content: 'Request Received.'});
                    case 'volume':
                        client.distube.setVolume(voiceChannel, volume);
                        return interaction.reply({content: `The volume has been set to ${volume}%.`});
                    case 'options':
                        const queue = await client.distube.getQueue(voiceChannel);
                        if (!queue) {
                            embed.setDescription(`No active queue found for ${voiceChannel}`).setColor('Red');
                            return interaction.reply({embeds: [embed], ephemeral: true});
                        }
                        switch (option) {
                            case 'skip':
                                await client.distube.skip(voiceChannel);
                                embed.setDescription('The track was skipped.').setColor('Random');
                                return interaction.reply({embeds: [embed]});
                            case 'stop':
                                await queue.stop(voiceChannel);
                                embed.setDescription('The queue has been stopped.').setColor('Random');
                                return interaction.reply({embeds: [embed]});
                            case 'pause':
                                await queue.pause(voiceChannel);
                                embed.setDescription('The track was paused.').setColor('Random');
                                return interaction.reply({embeds: [embed]});
                            case 'resume':
                                await queue.resume(voiceChannel);
                                embed.setDescription('The track was resumed.').setColor('Random');
                                return interaction.reply({embeds: [embed]});
                            case 'queue':
                                await (voiceChannel);
                                embed.setColor('Random').setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}.** ${song.name} - \`${song.formattedDuration}\``)}`);
                                return interaction.reply({embeds: [embed]});
                            case 'loopqueue':
                                if (queue.repeatMode === 2) {
                                    await client.distube.setRepeatMode(interaction, 0);
                                    embed.setDescription('\'🔁\'| **The track is not looped in mode:**\'Queue\'').setColor('Random');
                                    return interaction.reply({embeds: [embed]});
                                } else {
                                    await client.distube.setRepeatMode(interaction, 2);
                                    embed.setDescription('\'🔁\'| **The track is looped in mode:**\'Queue\'').setColor('Random');
                                    return interaction.reply({embeds: [embed]});
                                }
                            case 'loopall':
                                if (queue.repeatMode === 0) {
                                    await client.distube.setRepeatMode(interaction, 1);
                                    embed.setDescription('\'🔁\'| **The track is looped in mode:**\'All\'').setColor('Random');
                                    return interaction.reply({embeds: [embed]});
                                } else {
                                    await client.distube.setRepeatMode(interaction, 0);
                                    embed.setDescription('\'🔁\'| **The track is not looped in mode:**\'All\'').setColor('Random');
                                    return interaction.reply({embeds: [embed]});
                                }
                            case 'autoplay':
                                if (!queue.autoplay) {
                                    await client.distube.toggleAutoplay(interaction);
                                    embed.setDescription('📻*Autoplay was:*\'Active\'').setColor('Random');
                                    return interaction.reply({embeds: [embed]});
                                } else {
                                    await client.distube.toggleAutoplay(interaction);
                                    embed.setDescription('📻*Autoplay was:*\'Inactive\'').setColor('Random');
                                    return interaction.reply({embeds: [embed]});
                                }

                        }
                }

            } catch (err) {
                console.log(err);
                embed.setDescription('❌ | Something went wrong.').setColor('Red');
                return interaction.reply({embeds: [embed], ephemeral: true});
            }


        }
    }
};
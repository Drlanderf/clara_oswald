const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('embed')
            .setDescription('Retourne une embed'),
        async execute(interaction,client)
        {
            console.log("Command embed successfully apply");
            const embed = new EmbedBuilder()
                .setTitle(`Ceci est une embed`)
                .setDescription(`Ceci est une description trop cooool !`)
                .setColor(0x18e1ee)
                .setImage(client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp(Date.now())
                .setAuthor({
                    url: `https://www.youtube.com/channel/UCnK7oWn1A7RvKiB19ZIECZg`,
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.tag
                })
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.tag
                })
                .setURL(`https://www.youtube.com/channel/UCnK7oWn1A7RvKiB19ZIECZg`)
                .addFields([
                    {
                        name:`Champ 1`,
                        value:`Valeur du champ 1`,
                        inline: true
                    },
                    {
                        name:`Champ 2`,
                        value:`Valeur du champ 2`,
                        inline: true
                    }
                ]);
            await interaction.reply({
                embeds: [embed]
            })
        }
    }
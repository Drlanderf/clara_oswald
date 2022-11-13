const { SlashCommandBuilder } = require("discord.js");
const { sendLogMessage } = require(`../../functions/tools/sendLogMessage.js`);
module.exports = {
    data: new SlashCommandBuilder()
        .setName("talkasbot")
        .setDescription("Send a message as the bot")
        .addStringOption((option) => option.setName(`message`).setDescription(`The message you want to send as bot`).setRequired(true)),
    async execute(interaction, client) {
        let message = interaction.options.getString(`message`);
        if (!message) return;
        interaction.channel.send(`${message}`);
        try {
            await sendLogMessage(
                {
                    author: interaction.member.user,
                    guild: interaction.guild,
                    content: `${interaction.member.user} made bot send: ${message}`,
                },
                `Talkasbot command log`,
                client
            );
        } catch (e) {
            console.error(e);
        }
        interaction.reply({
            content: `The message "${message}" was sent successfully!`,
            ephemeral: true, //
        });
    },
};

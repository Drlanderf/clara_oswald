const { sendLogMessage } = require("../../functions/tools/sendLogMessage");
module.exports = {
  data: {
    name: "talkasbot",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `The message :\n${interaction.fields.getTextInputValue(
        `talkasbotInput`
      )}\nwas sent successfully!`,
      ephemeral: true,
    });
    interaction.channel.send(
      `${interaction.fields.getTextInputValue(`talkasbotInput`)}`
    );

    try {
      await sendLogMessage(
        {
          author: interaction.member.user,
          guild: interaction.guild,
          content: `${
            interaction.member.user
          } made bot send: \n${interaction.fields.getTextInputValue(
            `talkasbotInput`
          )}`,
        },
        `TalkAsBot command log`,
        client
      );
    } catch (e) {
      console.error(e);
    }
  },
};
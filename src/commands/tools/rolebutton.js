const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolebutton")
    .setDescription("Return the role button panel"),
  async execute(interaction, client) {
    /**************************************************************************/
    //Setting up buttons
    const buttonYt = new ButtonBuilder()
      .setCustomId(`notif-yt`)
      .setEmoji("📹")
      .setStyle(`Secondary`);

    const buttonTwitch = new ButtonBuilder()
      .setCustomId(`notif-twitch`)
      .setEmoji("📺")
      .setStyle(`Secondary`);

    const buttonArtiste = new ButtonBuilder()
      .setCustomId(`artiste`)
      .setEmoji("🎨")
      .setStyle(`Secondary`);

    const buttonGames = new ButtonBuilder()
      .setCustomId(`games`)
      .setEmoji("🎮")
      .setStyle(`Secondary`);

    const buttonTech = new ButtonBuilder()
      .setCustomId(`tech`)
      .setEmoji("💻")
      .setStyle(`Secondary`);

    const buttonClan = new ButtonBuilder()
      .setCustomId(`clan`)
      .setEmoji("♦")
      .setStyle(`Secondary`);

    const buttonSAB = new ButtonBuilder()
        .setCustomId(`sab`)
          .setEmoji("☠️")
          .setStyle(`Secondary`);

    const buttonCrossout = new ButtonBuilder()
          .setCustomId(`crossout`)
          .setEmoji("🚗")
          .setStyle(`Secondary`);
    /**************************************************************************/
    //Setting up the rows
    const row1 = new ActionRowBuilder()
      .addComponents(buttonYt)
      .addComponents(buttonTwitch)
      ;
    const row2 = new ActionRowBuilder()
      .addComponents(buttonGames)
      .addComponents(buttonTech)
        .addComponents(buttonArtiste);
      const row3 = new ActionRowBuilder()
          .addComponents(buttonClan)
          .addComponents(buttonSAB)
          .addComponents(buttonCrossout);
    /**************************************************************************/
    //Setting up the custom embed !
    let embed = new EmbedBuilder()
      .setTitle(`Choix des rôles :`)
      .addFields([
        {
          name: `📹 Youtube`,
          value: `Tu souhaites ne rater aucune nouvelles vidéos?\nAlors tag toi avec ce rôle !\nPermet d'être au courrant des nouvelles vidéos!`,
          inline: true,
        },
        {
          name: `📺 Twitch`,
          value: `Tu souhaites ne rater aucun live?\nAlors tag toi avec ce rôle !\nPermet d'être au courrant des lives!`,
          inline: true,
        },
        {
          name: `🎨 Artiste`,
          value: `Tu te sens l'âme d'un artiste ?\nAlors tag toi avec ce rôle !\nPermet l'accès à la catégorie spéciale des artistes.`,
          inline: true,
        },
        {
          name: `🎮 Games`,
          value: `Tu es un vrai G@MER dans l'âme?\nAlors tag toi avec ce rôle !\nPermet l'accès à la catégorie spéciale des gamers.`,
          inline: true,
        },
        {
          name: `💻 Tech`,
          value: `Tu es un vrai techos dans l'âme?\nAlors tag toi avec ce rôle !\nPermet l'accès à la catégorie spéciale des techos.`,
          inline: true,
        },
        {
          name: `♦ Warframe`,
          value: `Tu joues à Warframe?\nPermet l'accès aux salons Warframe\n*Nécéssite le tag games.*`,
          inline: true,
        },
          {
              name: `☠️ Skull and bones`,
              value: `Tu joues à Skull and Bones?\nPermet l'accès aux salons SAB\n*Nécéssite le tag games.*`,
              inline: true,
          },
          {
              name: `🚗 Crossout`,
              value: `Tu joues à Crossout?\nPermet l'accès aux salons Crossout\n*Nécéssite le tag games.*`,
              inline: true,
          },
      ])
      .setColor("DarkButNotBlack");
    /**************************************************************************/
    //Sending the message
    interaction.channel.send({
      components: [row1, row2, row3],
      embeds: [embed],
    });
    interaction.reply({
      content: `The Notif button has been send !`,
      ephemeral: true,
    });
  },
};

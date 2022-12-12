const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  Embed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Return the rules button panel"),
  async execute(interaction, client) {
    /**************************************************************************/
    //Setting up button
    const buttonRules = new ButtonBuilder()
      .setCustomId(`rules-check`)
      .setEmoji("✅")
      .setLabel("Lu et approuvé")
      .setStyle(`Success`);
    /**************************************************************************/
    //Setting up the custom embed.s !
    let embedcgu = new EmbedBuilder()
      .setTitle(`CGU DISCORD :`)
      .setURL(`https://discord.com/terms`)
      .setDescription(
        `⚠️ Le règlement de discord (CGU) est applicable à ce serveur discord, en ayant rejoins cette communauté et en vous étant inscrit sur discord vous accepté ces conditions.`
      )
      .setColor("Red");
    let embedrulespec = new EmbedBuilder()
      .setTitle(`Règlement spécifique à ce discord :`)
      .addFields([
        {
          name: `⛔ Art.1`,
          value: `La pub, quelle que soit sa forme (youtube, discord, kickstarter ou autre plateforme de crowdfounding pour des jeux/produits non terminés.) est strictement interdite.`,
          inline: true,
        },
        {
          name: `⛔ Art.2`,
          value: `Les mentions inutiles ou de masse (ex:everyone..) sont interdites. Les mentions aux subs,etc. hors conversation sont interdites aussi. Les mentions aux membres du staff sont interdites et seront sanctionnées par avertissement puis part un ban.`,
          inline: true,
        },
        {
          name: `⛔ Art.3`,
          value: `Les insultes, la haine, le racisme, harcèlement ou toute autre forme de manque de respect seront sanctionnés.`,
          inline: true,
        },
        {
          name: `⛔ Art.4`,
          value: `Le spam ou flood et le full Majuscule, peu importe de quoi, sont interdit. Envoyez votre message 1 fois, il sera vu.`,
          inline: true,
        },
        {
          name: `⛔ Art.5`,
          value: `Le trolling est déconseillé, il faut savoir s'arrêter, si vous vous payez la tête de quelqu'un, c'est marrant 5 minutes, pas plus.`,
          inline: true,
        },
        {
          name: `⛔ Art.6`,
          value: `Le spoil, quelque soit sa forme , qu'il soit vrai ou faux, est interdit en dehors du channel prévu à cet effet.`,
          inline: true,
        },
        {
          name: `⛔ Art.7`,
          value: `Aucune mention dans le channel "spoil" n'est toléré.`,
          inline: true,
        },
        {
          name: `⛔ Art.8`,
          value: `Les pseudos à caractères cancers sont interdits (emotes, caractères spéciaux, injurieux)`,
          inline: true,
        },
        {
          name: `⛔ Art.9`,
          value: `Spammer la Connexion/Deconnexion aux salons vocaux. Et évitez de vous connecter pour moins d'une minute pour ne pas parler.`,
          inline: true,
        },
        {
          name: `⛔ Art.10`,
          value: `La pub ou spam en mp (message privé) sont interdits (par la charte d'utilisation de Discord). Si vous souhaitez le signaler c'est ici -> https://dis.gd/contact`,
          inline: true,
        },
        {
          name: `⛔ Art.11`,
          value: `Spammer les commandes dans les channel est interdit.`,
          inline: true,
        },
        {
          name: `⛔ Art.12`,
          value: `Les débats politiques, les sujets sensibles (religions/p*rn/etc.) et les réactions en emojis injurieuses sont passible de kick, voir de ban !`,
          inline: true,
        },
        {
          name: `⚠️ Art.13`,
          value: `Un ban sur youtube/twitch pourra être aussi effectif sur ce discord.`,
          inline: true,
        },
        {
          name: `⚠️ Art.14`,
          value: `Les statuts personnalisés doivent respecter la règle sur les pseudos.`,
          inline: true,
        },
        {
          name: `⚠️ Art.15`,
          value: `Le channel spoil est en NSFW mais il est interdit de poster du NSFW dedans.`,
          inline: true,
        },
      ])
      .setFooter({
        text: `⚠️La modération se garde le droit d'ajouter, d'enlever ou modifier ce règlement à tout moment et sans avertissement, vous êtes ainsi tenus de rester au courant des modifications de celui-ci.`,
      })
      .setColor("Blue");
    let embedrulessupp = new EmbedBuilder()
      .setTitle(`Informations supplémentaire sur le règlement :`)
      .addFields([
        {
          name: `👮 Alinéa 1`,
          value: `Si quelqu'un commet une infraction (pub, etc...), mentionnez un modérateur: il appliquera une sanction. Elles peuvent varier selon la gravité de l'infraction.`,
          inline: true,
        },
        {
          name: `⚠️ Alinéa 2`,
          value: `Cette liste est non-exhaustive, si un modérateur juge que vous commettez une infraction malgré tout, il vous punira. Nous faisons confiance à votre bon sens.`,
          inline: true,
        },
      ])
      .setFooter({
        text: `tout abus de mentions des membres du staff sera sévèrement puni`,
      })
      .setColor("Yellow");
    let embedrulesyoucando = new EmbedBuilder()
      .setTitle(`Ce que vous pouvez faire :`)
      .addFields([
        {
          name: `✅`,
          value: `Etre respectueux et distribuer de l'amour partout, tant que ce n'est pas du spam!`,
          inline: true,
        },
        {
          name: `✅`,
          value: `Avoir un langage correct et courtois.`,
          inline: true,
        },
        {
          name: `✅`,
          value: `Avoir une orthographe un minimum correcte et lisible.`,
          inline: true,
        },
      ])
      .setFooter({
        text: `tout abus de mentions des membres du staff sera sévèrement puni`,
      })
      .setColor("Green");
    let embedreadandapprove = new EmbedBuilder()
      .setFooter({
        text: `En cliquant sur le bouton "lu et approuvé" vous confirmez avoir pris conscience du règlement et que vous vous engagez à le respecter.`,
      })
      .setColor("DarkButNotBlack");
    /**************************************************************************/
    //Sending the message
      interaction.channel.send({
          embeds: [
              embedcgu,
          ],
          content: `**Bievenue sur le discord communautaire de landerf !**\n\n**Merci de lire ces règles 👇 *ATTENTIVEMENT*  !**`,
      });
      interaction.channel.send({
          embeds: [
              embedrulespec,
          ],
      });
      interaction.channel.send({
          embeds: [
              embedrulessupp,
          ],
      });
      interaction.channel.send({
          embeds: [
              embedrulesyoucando,
          ],
      });
      interaction.channel.send({
          components: [new ActionRowBuilder().addComponents(buttonRules)],
          embeds: [
              embedreadandapprove,
          ],
      });
    interaction.reply({
      content: `The rules button has been send !`,
      ephemeral: true,
    });
  },
};

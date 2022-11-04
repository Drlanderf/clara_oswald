const canvacord = require("canvacord");
const { AttachmentBuilder, Client, Events, GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
require("dotenv").config();
const MyWelcomeChannelID = process.env.JOIN_CHANNEL;
const MyRoleID00 = process.env.ROLE_ID00;
const MyRoleID01 = process.env.ROLE_ID01;
const MyRoleID02 = process.env.ROLE_ID02;
const MyCustomWelcomeMessage = process.env.CUSTOM_WELCOME_MESSAGE;
module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {Discord.GuildMember} member
   * @param {import("../../bot.js")} client
   */
  async execute(member, client) {
    console.log("Event guildMemberAdd successfully apply");
    let welcomeCard = new canvacord.Welcomer(textTitle = "Bienvenue",textMessage = "Bienvenue sur {server}" )
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setAvatar(member.user.displayAvatarURL({ format: "png" }))
      .setColor("title", "#8651d0")
      .setColor("username-box", "#8651d0")
      .setColor("discriminator-box", "#8651d0")
      .setColor("message-box", "#8651d0")
      .setColor("border", "#49296c")
      .setColor("avatar", "#8651d0")
      .setBackground(`${process.cwd()}/assets/img/bg.png`)
      .setMemberCount(member.guild.memberCount);
      welcomeCard.textTitle = `Bienvenue`;
      welcomeCard.textMessage = `Bienvenue sur ${member.guild.name}`
      let Attachment = new AttachmentBuilder(await welcomeCard.build(), "welcome.png");
    const welcomeChannel = member.guild.channels.cache.get(`${MyWelcomeChannelID}`);

    try {
        welcomeChannel.send({
            content: `:wave::skin-tone-2: Salutation ${member},\n${MyCustomWelcomeMessage}`,
            files: [Attachment],
        });
      await member.roles.add(`${MyRoleID00}`);
      await member.roles.add(`${MyRoleID01}`);
      await member.roles.add(`${MyRoleID02}`);
    } catch (error) {
      console.log(error);
    }
  },
};

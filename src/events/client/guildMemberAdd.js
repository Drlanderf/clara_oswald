const Canvas = require("@napi-rs/canvas");
const {
  AttachmentBuilder,
  Client,
  Events,
  GatewayIntentBits,
  Discord,
} = require("discord.js");
const { request } = require("undici");
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
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      `${process.cwd()}/assets/img/tardis.png`
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#191246";
    context.strokeRect(0, 0, canvas.width, canvas.height);
    const { body } = await request(
      member.user.displayAvatarURL({ extension: "jpg" })
    );
    const avatar = await Canvas.loadImage(await body.arrayBuffer());

    const applyText = (canvas, text) => {
      const context = canvas.getContext("2d");
      let fontSize = 70;

      do {
        context.font = `${(fontSize -= 10)}px sans-serif`;
      } while (context.measureText(text).width > canvas.width - 300);
      return context.font;
    };

    context.drawImage(avatar, 25, 25, 200, 200);
    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    context.font = "28px sans-serif";
    context.fillStyle = "#ffffff";
    context.fillText("Bienvenue", canvas.width / 2.5, canvas.height / 3.5);

    context.font = applyText(canvas, `${member.user.displayName}!`);
    context.fillStyle = "#ffffff";
    context.fillText(
      `${member.user.displayName}!`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    let Attachment = new AttachmentBuilder(
        context,"welcome.png"
    );
    const welcomeChannel = member.guild.channels.cache.get(
      `${MyWelcomeChannelID}`
    );

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

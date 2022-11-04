const Canvas = require("@napi-rs/canvas");
const {
  AttachmentBuilder,
  Discord,
} = require("discord.js");
const MyWelcomeChannelID = process.env.JOIN_CHANNEL;
const MyRoleID00 = process.env.ROLE_ID00;
const MyRoleID01 = process.env.ROLE_ID01;
const MyRoleID02 = process.env.ROLE_ID02;
const MyCustomWelcomeMessage = process.env.CUSTOM_WELCOME_MESSAGE;

const welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500);
welcomeCanvas.context = welcomeCanvas.create.getContext("2d");
welcomeCanvas.context.font = "68px sans-serif";
welcomeCanvas.context.fillStyle = "#ffffff";
Canvas.loadImage(`${process.cwd()}/assets/img/bg.png`).then(async (img) => {
  welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
  welcomeCanvas.context.fillText("Bienvenue", 350, 75);
  welcomeCanvas.context.beginPath();
  welcomeCanvas.context.arc(512, 245, 128, 0, Math.PI * 2, true);
  welcomeCanvas.context.stroke();
  welcomeCanvas.context.fill();
});

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {Discord.GuildMember} member
   * @param {import("../../bot.js")} client
   */
  async execute(member, client) {
    console.log("Event guildMemberAdd successfully apply");
    const welcomeChannel = client.channels.cache.get(`${MyWelcomeChannelID}`);

    let canvas = welcomeCanvas;
    canvas.context.font = "42px sans-serif";
    canvas.context.textAlign = "center";
    canvas.context.fillText(member.user.tag.toUpperCase(), 512, 425);
    canvas.context.font = "28px sans-serif";
    canvas.context.fillText(
      `Tu es le ${member.guild.memberCount}e membres`,
      512,
      475
    );
    canvas.context.beginPath();
    canvas.context.arc(512, 245, 119, 0, Math.PI * 2, true);
    canvas.context.closePath();
    canvas.context.clip();

    await Canvas.loadImage(
      member.user.displayAvatarURL({ size: 1024, format: "png" })
    ).then((img) => {
      canvas.context.drawImage(img, 393, 125, 238, 238);
    });

    const attachment = new AttachmentBuilder(
      await canvas.create.encode("png"),
      { name: "profile-image.png" }
    );

    try {
      welcomeChannel.send({
        content: `:wave::skin-tone-2: Salutation ${member},\n${MyCustomWelcomeMessage}`,
        files: [attachment],
      });
      await member.roles.add([
        `${MyRoleID00}`,
        `${MyRoleID01}`,
        `${MyRoleID02}`,
      ]);
    } catch (error) {
      console.log(error);
    }
  },
};

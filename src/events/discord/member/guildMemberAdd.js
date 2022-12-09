const Canvas = require("canvas");
const { AttachmentBuilder, GuildMember, Client } = require("discord.js");
const Guild = require(`../../../schemas/guild`);
module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    /**************************************************************************/
    let guildProfile = await Guild.findOne({
      guildId: member.guild.id,
    });
    /**************************************************************************/
    const MyWelcomeChannelID = guildProfile.guildJoinChannel;
    const MyRoleID00 = guildProfile.roleId00;
    const MyRoleID01 = guildProfile.roleId01;
    const MyRoleID02 = guildProfile.roleId02;
    const MyCustomWelcomeMessage = guildProfile.customWelcomeMessage;
    const welcomeChannel = client.channels.cache.get(`${MyWelcomeChannelID}`);
    /**************************************************************************/
    const canvas = Canvas.createCanvas(1024, 500);
    let ctx = canvas.getContext("2d");
    //Setup of the background
    const background = await Canvas.loadImage(
      `${process.cwd()}/assets/img/The_Enclave_Flag_(Fallout).png`
    );
    ctx.drawImage(background, 0, 0, 1024, 500);
    ctx.beginPath();
    ctx.arc(512, 245, 128, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    /**************************************************************************/
    //Name of the user in the canvas
    ctx.font = "42px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 512, 425);
    /**************************************************************************/
    //Avatar of the user in the canvas
    ctx.beginPath();
    ctx.arc(512, 245, 119, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    //Taking the Avatar picture
    let avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ size: 1024, format: "png" })
    );
    ctx.drawImage(avatar, 393, 125, 238, 238);
    /**************************************************************************/
    //Making a new attachement with a custom name signature
    let attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: "made_by_doc_landerf.png",
    });

    /**************************************************************************/
    //Try to send the welcome message
    try {
      welcomeChannel.send({
        content: `:wave::skin-tone-2: Hey ${member},\n${MyCustomWelcomeMessage}`,
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


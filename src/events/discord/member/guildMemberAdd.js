const Canvas = require("@napi-rs/canvas");
const { promises } = require("fs");
const { join } = require("path");
const {
  getCounterChannelName,
} = require("../../../functions/tools/getCounterChannelName");
const {
  AttachmentBuilder,
  GuildMember,
  Client,
  EmbedBuilder,
} = require("discord.js");
const Guild = require(`../../../schemas/guild`);
module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    /* ------------------------------------------------------------
		Sync to DB
	   ------------------------------------------------------------ */
    let guildProfile = await Guild.findOne({
      guildId: member.guild.id,
    });
    /* ------------------------------------------------------------
		Variables
	   ------------------------------------------------------------ */
    const MyWelcomeChannelID = guildProfile.guildJoinChannel;
    if (!MyWelcomeChannelID) {
      console.error(
        Date(Date.now()).toString() +
          ` [${member.guild.id}] No Joinning Channel configured.`
      );
      return;
    }
    const MyRoleID00 = guildProfile.roleId00;
    const MyRoleID01 = guildProfile.roleId01;
    const MyRoleID02 = guildProfile.roleId02;
    const MyCustomWelcomeMessage = guildProfile.customWelcomeMessage;
    const welcomeChannel = client.channels.cache.get(`${MyWelcomeChannelID}`);
    if (!welcomeChannel) {
      console.error(
        Date(Date.now()).toString() +
          ` [${member.guild.id}] No Joinning Channel configured.`
      );
      return;
    }
    const myGuildCountChannel = guildProfile.guildCountChannel;
    //const countChannelName = client.channels.cache.get(`1088547089807581204`); //=> brut version
    const countChannelName = client.channels.cache.get(
      `${myGuildCountChannel}`
    ); //=>DB version

    /* ------------------------------------------------------------
		Canvas creation
		ID :	canvas,ctx
	   ------------------------------------------------------------ */
    const canvas = Canvas.createCanvas(1024, 500);
    let ctx = canvas.getContext("2d");
    /* ------------------------------------------------------------
		Setup the canvas background
	   ------------------------------------------------------------ */
    const background = await Canvas.loadImage(
      `${process.cwd()}/assets/img/bg.png`
    );
    ctx.drawImage(background, 0, 0, 1024, 500);
    ctx.beginPath();
    ctx.arc(512, 245, 128, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    /* ------------------------------------------------------------
		Taking and draw the name of the user and put in ctx
	   ------------------------------------------------------------ */
    ctx.font = "42px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 512, 425);
    /* ------------------------------------------------------------
		Taking and draw the avatar of the user
	   ------------------------------------------------------------ */
    ctx.beginPath();
    ctx.arc(512, 245, 119, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    /* ------------------------------------------------------------
		Taking the avatar picture of the user
		ID :	avatar
	   ------------------------------------------------------------ */
    let avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ size: 1024, format: "png" })
    );
    ctx.drawImage(avatar, 393, 125, 238, 238);
    /* ------------------------------------------------------------
		Setting up the attachement signature
		ID :	pngData
	   ------------------------------------------------------------ */
    const pngData = await canvas.encode("png");
    await promises.writeFile(
      join(`assets/img/`, "made_by_doc_landerf.png"),
      pngData
    );
    const file = new AttachmentBuilder("assets/img/made_by_doc_landerf.png");
    /* ------------------------------------------------------------
		Setting up the embed
		ID :	embed
	   ------------------------------------------------------------ */
    let embed = new EmbedBuilder()
      .setTitle(`:wave::skin-tone-2: Hey`)
      .setDescription(`${MyCustomWelcomeMessage}`)
      .setColor("Random")
      .setImage("attachment://made_by_doc_landerf.png")
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: `© Doc_Landerf all rights reserved\n`,
      })
      .addFields([
        {
          name: `:arrow_right: Invité par :`,
          value: `WORK IN PROGRESS`, //=> TODO: add the inviter name
          inline: true,
        },
        {
          name: `:arrow_right: Le serveur compte désormait :`,
          value: getCounterChannelName(`${member.guild.memberCount}`),
          inline: true,
        },
      ])
      .setTimestamp(Date.now());
    /* ------------------------------------------------------------
              Update the counter
              ID :	channel,
              DATA use : myGuildCountChannel.
         ------------------------------------------------------------ */
    if (myGuildCountChannel) {
      const newCountName = getCounterChannelName(`${member.guild.memberCount}`);
      countChannelName.setName(newCountName);
    }
    /* ------------------------------------------------------------
		    Try to send the welcome message
	     ------------------------------------------------------------ */
    try {
      /* ------------------------------------------------------------
              Send the message to the welcome channel
              ID :	welcomeChannel,
              DATA use : member, embed, file.
         ------------------------------------------------------------ */
      welcomeChannel.send({
        content: `${member}`,
        embeds: [embed],
        files: [file],
      });
      /* ------------------------------------------------------------
              Add the role to the new member
              ID :	member,
              DATA use : MyRoleID00, MyRoleID01, MyRoleID02.
         ------------------------------------------------------------ */
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

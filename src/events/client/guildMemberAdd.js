const Canvas = require("canvas");
const Discord = require("discord.js");
const welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024,500);
welcomeCanvas.context = welcomeCanvas.create.getContext("2d");
welcomeCanvas.context.font = "68px sans-serif";
welcomeCanvas.context.fillStyle = "#ffffff";
Canvas.loadImage(`${process.cwd()}/assets/img/bg.png`).then(async (img) => {
    welcomeCanvas.context.drawImage(img,0,0,1024,500);
    welcomeCanvas.context.fillText("Bienvenue", 350,75);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512,245,128,0, Math.PI * 2, true);
    welcomeCanvas.context.stroke();
    welcomeCanvas.context.fill();
});
module.exports =
    {
        name: 'guildMemberAdd',
        /**
         * @param {Discord.GuildMember} member
         * @param {import("../../bot.js")} client
         */
        async execute(member, client) {
            console.log("guildMemberAdd Action SUCCEED !");


        const WelcomeChannel = client.channels.cache.get("762448607260835850");
        let canvas = welcomeCanvas;
        canvas.context.font = "42px sans-serif";
        canvas.context.textAlign = "center";
        canvas.context.fillText(member.user.tag.toUpperCase(),512,425);
        canvas.context.font = "28px sans-serif";
        canvas.context.fillText(`Tu es le ${member.guild.memberCount}e membres`, 512,475);
        canvas.context.beginPath();
        canvas.context.arc(512,245,119,0,Math.PI * 2, true);
        canvas.context.closePath();
        canvas.context.clip();
        await Canvas.loadImage(member.user.displayAvatarURL({size: 1024,format:'png'})).then(img => {
            canvas.context.drawImage(img, 393,125,238,238);
        })
        let Attachment = new Discord.AttachmentBuilder(canvas.create.toBuffer());
        Attachment.setName(`welcome-${member.id}.png`);
        try{
            WelcomeChannel.send({content:`:wave::skin-tone-2: Salutation ${member}, bienvenue sur ${member.guild.name}\nL'équipe de ce discord t'invite a approuver les règles afin d'accèder à ce dernier <#762441206642245674>\nN'oublies pas de sélectionner tes rôles via notre fabuleux auto-rôle dans <#763763437041614848>`,files: [Attachment]});
            await member.roles.add("767145270671966220");
            await member.roles.add("767146108278276096");
            await member.roles.add("763809099518705695");
        } catch (error){
            console.log(error);
        }
    }
}
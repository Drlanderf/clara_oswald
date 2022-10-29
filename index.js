require('dotenv').config();
const MyToken = process.env.BOT_TOKEN;
//Variables simple
const { Client, GatewayIntentBits} = require("discord.js");
const Discord = require("discord.js");
const Canvas = require("canvas");
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers
        ]
    });
let MyTestingReplyVar = "quoi";
let MyLeavingMessage01 = " est parti sans un aurevoir.";
let MyLeavingMessage02 = " a voyagé dans le passé où il n'était pas encore sur le serveur !";
let MyLeavingMessage03 = " a rejoint la planete prison des Dalek, on ne l'a plus jamais revu.";
let MyLeavingMessage04 = " est parti en quête d'aventure, on ne l'a plus jamais revu.";



//SETUP DU CANVAS
var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024,500);
welcomeCanvas.context = welcomeCanvas.create.getContext("2d");
welcomeCanvas.context.font = "68px sans-serif";
welcomeCanvas.context.fillStyle = "#ffffff";
Canvas.loadImage("./img/bg.png").then(async (img) => {
    welcomeCanvas.context.drawImage(img,0,0,1024,500);
    welcomeCanvas.context.fillText("Bienvenue", 350,75);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512,245,128,0, Math.PI * 2, true);
    welcomeCanvas.context.stroke();
    welcomeCanvas.context.fill();
})
console.log("Canvas Init SUCCEED !");



client.login(MyToken).then(() => {
    console.log("Login Action SUCCEED !");
});
client.on("ready",() => {
    console.log("Bot OK");
})

client.on("messageCreate", message => {
    let test = message.content;
    let result = test.toLowerCase();
    if(result.includes(MyTestingReplyVar))
        message.reply("feur :stuck_out_tongue_closed_eyes: !",).then(() =>{
            console.log("Reply Action 'feur' SUCCEED !");
        }) ;
});
//Event quand quelqu'un arrive sur le serveur discord
client.on("guildMemberAdd", async member => {
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
    console.log("Canvas Creation with discord SUCCEED !");
    try{
        WelcomeChannel.send({content:`:wave::skin-tone-2: Salutation ${member}, bienvenue sur ${member.guild.name},
    L'équipe de ce discord t'invite a approuver les règles afin d'accèder à ce dernier <#762441206642245674> 
    N'oublies pas de sélectionner tes rôles via notre fabuleux auto-rôle dans <#763763437041614848>`,files: [Attachment]});
        console.log("Welcome Message with Attachment Action SUCCEED !");
    } catch (error){
        console.log(error);
    }

    await member.roles.add("763809099518705695");
    console.log("member.role.add 'Affinité(s)' Action SUCCEED !");
    await member.roles.add("767146108278276096");
    console.log("member.role.add 'Catégorie(s)' Action SUCCEED !");
    await member.roles.add("767145270671966220");
    console.log("member.role.add 'Notification(s)' Action SUCCEED !");
});
//client.emit("guildMemberAdd");
//Event quand quelqu'un quitte le serveur discord
client.on("guildMemberRemove",member => {
    console.log("guildMemberRemove Action SUCCEED !");
    //"<@"+ member.id + ">"
    const WelcomeChannel = client.channels.cache.get("762448607260835850");
    //WelcomeChannel.send("<@"+ member.id + ">" + " est parti.");
    var Randomizer = Math.floor(Math.random() * 101);
    if(Randomizer>=75 && Randomizer<=100) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage01);
    if(Randomizer>=50 && Randomizer<75) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage02);
    if(Randomizer>=25 && Randomizer<50) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage03);
    if(Randomizer>=0 && Randomizer<25) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage04);
});

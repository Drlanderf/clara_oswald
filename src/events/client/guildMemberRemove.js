const Discord = require("discord.js");
require('dotenv').config();
const MyLeavingChannelID = process.env.LEAVING_CHANNEL;
const MyLeavingMessage01 = process.env.MY_LEAVING_MESSAGE00;
const MyLeavingMessage02 = process.env.MY_LEAVING_MESSAGE01;
const MyLeavingMessage03 = process.env.MY_LEAVING_MESSAGE02;
const MyLeavingMessage04 = process.env.MY_LEAVING_MESSAGE03;
//Actif quand une personne quitte le serveur discord.
module.exports =
    {
        name: 'guildMemberRemove',
        /**
         * @param {Discord.GuildMember} member
         * @param {import("../../bot.js")} client
         */
        async execute(member, client) {
            console.log("Event guildMemberRemove successfully apply");


            const WelcomeChannel = client.channels.cache.get(`${MyLeavingChannelID}`);
            try{
                let Randomizer = Math.floor(Math.random() * 101);
                if(Randomizer>=75 && Randomizer<=100) WelcomeChannel.send("<@"+ member.id + ">" + `${MyLeavingMessage01}`);
                if(Randomizer>=50 && Randomizer<75) WelcomeChannel.send("<@"+ member.id + ">" + `${MyLeavingMessage02}`);
                if(Randomizer>=25 && Randomizer<50) WelcomeChannel.send("<@"+ member.id + ">" + `${MyLeavingMessage03}`);
                if(Randomizer>=0 && Randomizer<25) WelcomeChannel.send("<@"+ member.id + ">" + `${MyLeavingMessage04}`);
            } catch (error){
                console.log(error);
            }
        }
    }
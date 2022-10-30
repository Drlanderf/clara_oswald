const Discord = require("discord.js");
const MyLeavingMessage01 = " est parti sans un aurevoir.";
const MyLeavingMessage02 = " a voyagé dans le passé où il n'était pas encore sur le serveur !";
const MyLeavingMessage03 = " a rejoint la planete prison des Dalek, on ne l'a plus jamais revu.";
const MyLeavingMessage04 = " est parti en quête d'aventure, on ne l'a plus jamais revu.";

module.exports =
    {
        name: 'guildMemberRemove',
        /**
         * @param {Discord.GuildMember} member
         * @param {import("../../bot.js")} client
         */
        async execute(member, client) {
            console.log("Event guildMemberRemove successfully apply");


            const WelcomeChannel = client.channels.cache.get("762448607260835850");
            try{
                let Randomizer = Math.floor(Math.random() * 101);
                if(Randomizer>=75 && Randomizer<=100) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage01);
                if(Randomizer>=50 && Randomizer<75) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage02);
                if(Randomizer>=25 && Randomizer<50) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage03);
                if(Randomizer>=0 && Randomizer<25) WelcomeChannel.send("<@"+ member.id + ">" + MyLeavingMessage04);
            } catch (error){
                console.log(error);
            }
        }
    }
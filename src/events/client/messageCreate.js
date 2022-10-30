const { Message } = require('discord.js');
const Discord = require("discord.js");
const MyTestingReplyVar01 = "quoi";
module.exports =
    {
        name: 'messageCreate',
        /**
         * @param {import("../../bot.js")} client
         * @param {Message} message
         */
        async execute(message,client) { // WARNING CLIENT EVERYTIME THE LAST
            console.log("Event messageCreate successfully apply");
            /*console.log("message.content is :");
            console.log(message.content);*/
            try{
                const test = message.content;
                const result = test.toLowerCase();
                if(result.includes(MyTestingReplyVar01))
                    message.reply("feur :stuck_out_tongue_closed_eyes: !",).then(() =>{
                        console.log("Reply Action 'feur' SUCCEED !");
                    }) ;
            } catch (error){
                console.error(error);
            }
        }
    }
const { Message } = require('discord.js');
require('dotenv').config();
const MyTestingReplyVar00 = process.env.MY_TESTING_REPLY_VAR00;
const MyReplyVar00 = process.env.MY_REPLY_VAR00;
//
module.exports =
    {
        name: 'messageCreate',
        /**
         * @param {import("../../bot.js")} client
         * @param {Message} message
         */
        async execute(message,client) { // WARNING CLIENT EVERYTIME THE LAST
            console.log("Event messageCreate successfully apply");
            try{
                const test = message.content;
                const result = test.toLowerCase();
                if(result.includes(MyTestingReplyVar00))
                    message.reply(MyReplyVar00,).then(() =>{
                        console.log(`Reply Action ${MyReplyVar00} SUCCEED !`);
                    }) ;
            } catch (error){
                console.error(error);
            }
        }
    }
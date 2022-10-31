const {ActivityType} = require("discord.js");
module.exports = (client)=>{
    client.pickPresence = async () => {
        const options = [
            {
                type: ActivityType.Watching,
                text: "le tardis avec admiration",
                status: "online"
            },
            {
                type: ActivityType.Listening,
                text: "for commands",
                status: "idle"
            },
            {
                type: ActivityType.Playing,
                text: "à sauver le docteur",
                status: "dnd"
            },
        ];
        const option = Math.floor(Math.random()*options.length);

        client.user.setPresence({
            activities: [{
                name: options[option].text,
                type: options[option].type
            }],
            status: options[option].status
        });
    }
}
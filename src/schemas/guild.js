const { Schema, model } = require("mongoose");
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    guildIcon: { type: String, required: false },
    //channel I need
    guildJoinChannel: { type: String, required: false },
    guildLeavingChannel: { type: String, required: false },
    guildAutoLogChannel: { type: String, required: false },
    guildYoutubeChannel: { type: String, required: false },
    guildTwitchChannel: { type: String, required: false },
    //different roleId can be use
    roleId00: { type: String, required: false },
    roleId01: { type: String, required: false },
    roleId02: { type: String, required: false },
    roleTwitchNotificationId: { type: String, required: false },
    roleYoutubeNotificationId: { type: String, required: false },
    //custom join/leave message
    customWelcomeMessage: { type: String, required: false },
    customLeavingMessage00: { type: String, required: false },
    customLeavingMessage01: { type: String, required: false },
    customLeavingMessage02: { type: String, required: false },
    customLeavingMessage03: { type: String, required: false },
    //social info
    twitchChannelName: { type: String, required: false },
    youtubeChannelId00: { type: String, required: false },
    //Funny things
    testingReplyVar00: { type: String, required: false },
    replyVar00: { type: String, required: false },
    testingReplyVar01: { type: String, required: false },
    replyVar01: { type: String, required: false },
    //last video id from YT
    lastVideo00: { type: String, required: false },
    lastVideo01: { type: String, required: false },
});
module.exports = model("Guild", guildSchema, "guilds");

require("dotenv").config({ path: `${__dirname}/../.env` });
const { BOT_TOKEN, DATABASE_TOKEN } = process.env;
const { Client, Collection } = require("discord.js");
const { connect,mongoose } = require("mongoose");
const { loadEvents } = require("./functions/handlers/handleEvents");
const { DisTube } = require('distube')
const {SpotifyPlugin} = require("@distube/spotify");


const client = new Client({
  intents: [process.argv[3] ? 3276799 : 531,`GuildVoiceStates`]
}); // => That will include ALL the intents - though

console.log(`o-------------------------------o`);
console.log(`|   Thanks for using my bot     |`);
client.configs = new Collection();
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});
(async () => {
  try {
    mongoose.set('strictQuery', true);
    loadEvents(client);
    connect(DATABASE_TOKEN);
    client.login(BOT_TOKEN);
  } catch (e) {
    console.error(e);
  }
})();
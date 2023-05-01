const ascii = require("ascii-table");
const { loadCommands } = require("../../../functions/handlers/handleCommands");
const { loadComponents } = require("../../../functions/handlers/handleComponents");
const { checkDBGuildId } = require("../../../functions/mongo/checkDBGuildId");
const { pickPresence } = require("../../../functions/tools/pickPresence");
/*const { checkVideoTech } = require("../../../functions/social/checkVideoTech");
const { checkStreamTwitch } = require("../../../functions/social/checkStreamTwitch");
const { checkVideoGaming } = require("../../../functions/social/checkVideoGaming");*/
module.exports = {
  name: "ready",
  async execute(client) {
    const table = new ascii().setHeading("Logged into Discord as");
    table.addRow(`${client.user.tag} - ${client.user.id}`);
    console.log(table.toString());
    await loadCommands(client);
    await checkDBGuildId(client);
    await pickPresence(client);
    await loadComponents(client);
    /* ------------------------------------------------------------
		Sync all member with the cache of the bot
	   ------------------------------------------------------------ */
    client.guilds.cache.forEach((guild) => {
      guild.members.fetch()
          .then(()=>console.log(Date(Date.now()).toString() +"[Event] Ready : Fetching members for guild "+guild.name))
          .catch(console.error);
    });
    setInterval(() => pickPresence(client), 15 * 1000);
    //setInterval(() => checkStreamTwitch(interaction, client), 120 * 1000);//to fix it
    //setInterval(() => checkVideoTech(interaction, client), 60 * 1000);//to fix it
    //setInterval(() => checkVideoGaming(interaction, client), 60 * 1000);//to fix it
  },
};

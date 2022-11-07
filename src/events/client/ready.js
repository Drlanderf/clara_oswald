const ascii = require("ascii-table");
const { loadCommands } = require("../../functions/handlers/handleCommands");
const { checkDBGuildId } = require("../../functions/mongo/checkDBGuildId");
/*
const {checkStreamTwitch} = require("../../functions/social/checkStreamTwitch");
const { checkVideoGaming } = require("../../functions/social/checkVideoGaming");
const { checkVideoTech } = require("../../functions/social/checkVideoTech");
*/
const { pickPresence } = require("../../functions/tools/pickPresence");
module.exports = {
  name: "ready",
  execute(client) {
    const table = new ascii().setHeading("Logged into Discord as");
    table.addRow(`${client.user.tag}`);
    console.log(table.toString());
    checkDBGuildId(client).then();
    loadCommands(client).then();

    setInterval(() => pickPresence(client), 15 * 1000);
    /*
    setInterval(() => checkVideoTech(client), 60 * 1000);
    setInterval(() => checkVideoGaming(client), 60 * 1000);
    setInterval(() => checkStreamTwitch(client), 120 * 1000);
    */
  },
};

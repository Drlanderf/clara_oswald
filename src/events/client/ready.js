const ascii = require("ascii-table");
const { loadCommands } = require("../../functions/handlers/handleCommands");
const { checkDBGuildId } = require("../../functions/mongo/checkDBGuildId");
const { pickPresence } = require("../../functions/tools/pickPresence");
module.exports = {
  name: "ready",
  execute(client) {
    const table = new ascii().setHeading("Logged into Discord as");
    table.addRow(`${client.user.tag}`);
    console.log(table.toString());
    loadCommands(client).then();
    checkDBGuildId(client).then();
    setInterval(() => pickPresence(client), 15 * 1000);
  },
};

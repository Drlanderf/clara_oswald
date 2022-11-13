const ascii = require("ascii-table");
const { loadCommands } = require("../../functions/handlers/handleCommands");
const { checkDBGuildId } = require("../../functions/mongo/checkDBGuildId");
const { pickPresence } = require("../../functions/tools/pickPresence");
module.exports = {
    name: "ready",
    async execute(client) {
        const table = new ascii().setHeading("Logged into Discord as");
        table.addRow(`${client.user.tag}`);
        console.log(table.toString());
        await loadCommands(client);
        await checkDBGuildId(client);
        await pickPresence(client);
        setInterval(() => pickPresence(client), 15 * 1000);
    },
};

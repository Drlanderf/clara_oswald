const ascii = require("ascii-table");
module.exports = {
  name: "ready",
  execute(client) {
    const table = new ascii().setHeading("Logged into Discord as");
    table.addRow(`${client.user.tag}`);
    console.log(table.toString());
    client.checkDBGuildId();
    setInterval(client.pickPresence, 15 * 1000);
    setInterval(client.checkVideoTech, 15 * 1000);
    setInterval(client.checkVideoGaming, 15 * 1000);
    setInterval(client.checkStreamTwitch, 60 * 1000);

  },
};

const fs = require("fs");
const { connection } = require("mongoose");
const ascii = require("ascii-table");
const chalk = require("chalk");
async function loadEvents(client) {
  const table = new ascii().setHeading("Events", "Status");
  const eventFolders = fs.readdirSync("./src/events");

  await client.events.clear();

  for (const folder of eventFolders) {
    const eventFiles = fs
      .readdirSync(`./src/events/${folder}`)
      .filter((file) => file.endsWith(".js"));
    switch (folder) {
      case `client`:
        for (const file of eventFiles) {
          const event = require(`../../events/${folder}/${file}`);
          if (event.once)
            client.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          else
            client.on(event.name, (...args) => event.execute(...args, client));
          table.addRow(event.name, `LOADED 🟩`);
        }
        break;
      case "mongo":
        for (const file of eventFiles) {
          const event = require(`../../events/${folder}/${file}`);
          if (event.once)
            connection.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          else
            connection.on(event.name, (...args) =>
              event.execute(...args, client)
            );
          table.addRow(event.name, `LOADED 🟩`);
        }
        break;
      default:
        break;
    }
  }
  return console.log(table.toString(), "\nEvents Loaded");
}
module.exports = { loadEvents };

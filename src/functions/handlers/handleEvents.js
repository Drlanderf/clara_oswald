const fs = require("fs");
const { connection } = require("mongoose");
const ascii = require("ascii-table");
async function loadEvents(client) {
  const table = new ascii().setHeading("Events", "Status");
  const eventFolders = fs.readdirSync(`${__dirname}/../../events`);
  await client.events.clear();
  for (const folder of eventFolders) {
    const events = fs.readdirSync(`${__dirname}/../../events/${folder}`);
    switch (folder) {
      case "mongo":
        for (const file of events.filter((file) => file.endsWith(".js"))) {
          const event = require(`${__dirname}/../../events/${folder}/${file}`);
          if (event.once)
            connection.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          else
            connection.on(event.name, (...args) =>
              event.execute(...args, client)
            );
          table.addRow(event.name, `🟩`);
        }
        break;
      case "discord":
        for (const fol of events) {
          const discordEvents = fs
            .readdirSync(`${__dirname}/../../events/${folder}/${fol}`)
            .filter((file) => file.endsWith(".js"));
          for (const file of discordEvents) {
            const event = require(`../../events/${folder}/${fol}/${file}`);
            if (event.name && typeof event.execute == "function") {
              table.addRow(event.name, `🟩`);
              if (event.once)
                client.once(event.name, (...args) =>
                  event.execute(...args, client)
                );
              else
                client.on(event.name, (...args) =>
                  event.execute(...args, client)
                );
            } else table.addRow(event.name, `🟥`);
          }
        }
        break;
        case "distube":
          for (const file of events.filter((file) => file.endsWith(".js"))) {
            const event = require(`${__dirname}/../../events/${folder}/${file}`);
            if (event.once)
              connection.once(event.name, (...args) =>
                  event.execute(...args, client)
              );
            else
              connection.on(event.name, (...args) =>
                  event.execute(...args, client)
              );
            table.addRow(event.name, `🟩`);
          }
        break;
      default:
        break;
    }
  }
  return console.log(table.toString(), "\nEvents Loaded");
}
module.exports = { loadEvents };

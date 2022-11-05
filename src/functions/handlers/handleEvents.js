const fs = require("fs");
module.exports = (client) => {
  client.handleEvents = async () => {
    console.log("Handler of Events successfully apply");
    const eventFolders = fs.readdirSync("./src/events");
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of eventFiles) {
        const event = require(`../../events/${folder}/${file}`);
        const execute = (...args) => event.execute(...args, client); // WARNING CLIENT EVERYTIME THE LAST
        if (event.once) client.once(event.name, execute);
        else client.on(event.name, execute);
      }
    }
  };
};

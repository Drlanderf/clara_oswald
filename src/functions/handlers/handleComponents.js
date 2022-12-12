const ascii = require("ascii-table");
const fs = require("fs");
const { connection } = require("mongoose");

async function loadComponents(client) {
  const table = new ascii().setHeading("Components", "Status");
  const componentFolders = fs.readdirSync(`${__dirname}/../../components`);
  for (const folder of componentFolders) {
    const componentFiles = fs.readdirSync(
      `${__dirname}/../../components/${folder}`
    );

    const { buttons } = client;

    switch (folder) {
      case "buttons":
        for (const file of componentFiles.filter((file) =>
          file.endsWith(".js")
        )) {
          const button = require(`${__dirname}/../../components/${folder}/${file}`);
          buttons.set(button.data.name, button);
          table.addRow(button.name, `🟩`);
        }
        break;
        case "roles":
            for (const file of componentFiles.filter((file) =>
                file.endsWith(".js")
            )) {
                const roles = require(`${__dirname}/../../components/${folder}/${file}`);
                buttons.set(roles.data.name, roles);
                table.addRow(roles.name, `🟩`);
            }
            break;
      default:
        break;
    }
  }
  return console.log(table.toString(), "\nComponents Loaded");
}
module.exports = { loadComponents };

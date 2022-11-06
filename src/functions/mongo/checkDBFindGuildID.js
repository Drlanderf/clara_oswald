const Guild = require(`../../schemas/guild`);
module.exports = (client) => {
  client.checkDBFindGuildID = async (guild) => {
    return Guild.findOne({
      guildId: `${guild}`,
    });
  };
};

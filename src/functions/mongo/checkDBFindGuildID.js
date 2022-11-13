const Guild = require(`../../schemas/guild`);
async function checkDBFindGuildID(guild) {
    return Guild.findOne({
        guildId: `${guild}`,
    });
}
module.exports = { checkDBFindGuildID };

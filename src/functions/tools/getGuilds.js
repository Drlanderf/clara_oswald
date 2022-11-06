module.exports = (client) => {
  client.getGuilds = async () => {
    return client.guilds.cache.map(guild => guild.id);
  };
};
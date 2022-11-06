async function getGuilds(client){
    return client.guilds.cache.map((guild) => guild.id);
  }module.exports={getGuilds};

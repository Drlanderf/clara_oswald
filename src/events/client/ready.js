module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.checkDBGuildId();
    //setInterval(client.pickPresence, 15 * 1000);
    //setInterval(client.checkVideoTech, 300 * 1000); //Improve perf
    //setInterval(client.checkVideoGaming, 300 * 1000); //Improve perf
    //setInterval(client.checkStreamTwitch, 60 * 1000);
    console.log(`o--------------------------------------------o`);
    console.log(`|          Logged into Discord as            |`);
    console.log(`|            ${client.user.tag}               |`);
    console.log(`o--------------------------------------------o`);
  },
};

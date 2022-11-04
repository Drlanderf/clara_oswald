module.exports = {
  name: "ready",
  async execute(client) {
    setInterval(client.pickPresence, 15 * 1000);
    setInterval(client.checkVideoTech, 300 * 1000); //Improve perf
    setInterval(client.checkVideoGaming, 300 * 1000); //Improve perf
    console.log(`o--------------------------------------------o`);
    console.log(`|          Logged into Discord as            |`);
    console.log(`|            ${client.user.tag}               |`);
    console.log(`o--------------------------------------------o`);
  },
};

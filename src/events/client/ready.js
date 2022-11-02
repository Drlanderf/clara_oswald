module.exports = {
  name: "ready",
  async execute(client) {
    setInterval(client.pickPresence, 30 * 1000);
    setInterval(client.checkVideoTech, 30 * 1000); // ?
    setInterval(client.checkVideoGaming, 30 * 1000); // ?
    console.log(`o--------------------------------------------o`);
    console.log(`|          Logged into Discord as            |`);
    console.log(`|            ${client.user.tag}               |`);
    console.log(`o--------------------------------------------o`);
  },
};

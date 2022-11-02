module.exports = {
  name: "ready",
  async execute(client) {
    setInterval(client.pickPresence, 30 * 1000);
    setTimeout(client.checkVideoTech, 30 * 1000); // ?
    setTimeout(client.checkVideoGaming, 30 * 1000); // ?
    console.log(`o--------------------------------------------o`);
    console.log(`|          Logged into Discord as            |`);
    console.log(`|            ${client.user.tag}               |`);
    console.log(`o--------------------------------------------o`);
  },

};

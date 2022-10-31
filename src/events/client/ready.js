module.exports = {
        name: 'ready',
        once: true,
        async execute(client) {
                setInterval(client.pickPresence, 10 * 1000);
                console.log(`o--------------------------------------------o`);
                console.log(`|                                            |`);
                console.log(`|           Thanks to use my bot             |`);
                console.log(`|                                            |`);
                console.log(`|          Logged into Discord as            |`);
                console.log(`|            ${client.user.tag}               |`);
                console.log(`|                                            |`);
                console.log(`o--------------------------------------------o`);
        },
    };
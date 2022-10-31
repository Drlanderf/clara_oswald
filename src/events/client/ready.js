module.exports = {
        name: 'ready',
        once: true,
        async execute(client) {
                setInterval(client.pickPresence, 10 * 1000);
                console.log(`o--------------------------------------------o`);
                console.log(`|                                            |`);
                console.log(`|          Logged into Discord as            |`);
                console.log(`|                                            |`);
                console.log(`|            ${client.user.tag}               |`);
                console.log(`|                                            |`);
                console.log(`o--------------------------------------------o`);
                setTimeout(client.checkVideo, 20*1000);
        },
    };
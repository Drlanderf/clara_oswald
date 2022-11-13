const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function timesRepeat(toDelete) {
    if (toDelete < 100) return [toDelete];
    let i = [100];
    while (toDelete >= 100) {
        toDelete -= 100;
        if (toDelete > 100) i.push(100);
        else i.push(toDelete);
    }
    return i;
}

function plural(i) {
    if (i == 1) return "message";
    return "messages";
}

async function loopFunction(i, deleting, channel, user, total, interaction) {
    let numb = deleting[deleting.length - i];
    if (numb != 0) {
        let messages = await channel.messages.fetch({
            limit: parseInt(numb),
        });
        if (messages?.size == 0)
            return interaction.editReply({
                content: `Got rid of: ${total} ${plural(total)} ${user ? `that ${user} sent` : ``}`,
            });
        let final;
        if (user) {
            let one = [...(await messages.filter((m) => m.author.id == user.id))].map((e) => e[1]);
            final = one.slice(0, numb);
        } else {
            final = messages;
        }
        channel
            .bulkDelete(final, true)
            //true after `final` is needed as it makes the djs check if messages that you want to delete are older than 2 weeks or cannot be deleted by bot and skips them
            .then((messages) => {
                total += messages?.size || 0;
            })
            .catch((error) => {
                console.error("error →", error);
                interaction.editReply({
                    content: `There was an error, check the console/tell the Waves to do so ^-^" ${channel}!`,
                });
            });
    }
    //waiting 1 second between each iteration so we don't get flagged for spamming to djs api
    await sleep(1000);
    if (!--i || !numb) loopFunction(i, deleting, channel, user, total);
    else {
        return interaction.editReply({
            content: `Got rid of: ${total} messages ${plural(total)} ${user ? `that ${user} sent` : ``} ${channel.name}`,
        });
    }
}

module.exports = {
    data: {
        name: "clear",
        description: "Remove specific number of messages",
        options: [
            {
                name: "amount",
                description: "Amount of messages to purge",
                type: 4,
                min_value: 1,
                required: true,
            },
            {
                name: "targetuser",
                description: "User whose messages are to be purged",
                type: 6,
                required: false,
            },
            {
                name: "targetchannel",
                description: "Channel where messages are to be purged",
                type: 7,
                channel_types: [0, 2, 5, 10, 11, 12],
                required: false,
            },
        ],
    },
    async execute(interaction, client) {
        console.log(interaction);
        const user = interaction.options.getUser("targetuser");
        let toDelete = interaction.options.getInteger("amount");
        await interaction.deferReply({ ephemeral: true });
        const total = 0;
        const deleting = await timesRepeat(toDelete);
        const channel = (await interaction.options.getChannel("targetchannel")) || (await client.channels.cache.get(interaction.channelId));
        loopFunction(deleting.length, deleting, channel, user, total, interaction);
    },
};

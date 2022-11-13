const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { ChatInputCommandInteraction, Client } = require("discord.js");
async function timesRepeat(toDelete) {
    if (toDelete < 99) return [toDelete];
    let i = [99];
    while (toDelete >= 99) {
        toDelete -= 99;
        if (toDelete > 99) i.push(99);
        else i.push(toDelete);
    }
    return i;
}

function plural(i) {
    if (i == 1) return "message";
    return "messages";
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
                max_value: 10000,
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
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser("targetuser");
        let toDelete = interaction.options.getInteger("amount");
        await interaction.reply({ content: `Removal in progress...`, ephemeral: true });
        if (toDelete < 1) return interaction.editReply(`Amount of messages to delete must be equal to 1 or greater.\nReceived: ${toDelete}`);
        let total = 0;
        let deleting = await timesRepeat(toDelete);
        const channel = (await interaction.options.getChannel("targetchannel")) || (await client.channels.cache.get(interaction.channelId));
        let last;
        for (let i = deleting.length; i > 0; i--) {
            let numb = deleting[deleting.length - i];
            if (numb > 0) {
                let messages = await channel.messages.fetch({
                    limit: parseInt(numb) + 1,
                    after: last,
                });
                last = messages.lastKey();
                if (messages?.size == 0)
                    return await interaction.editReply({
                        content: `Got rid of: ${total} ${plural(total)} ${user ? `that ${user} sent` : ``} from ${channel}`,
                    });
                let final;
                if (user) final = [...(await messages.filter((m) => m.author.id == user.id && m.deletable))].map((e) => e[1]).slice(0, numb);
                else final = [...(await messages.filter((m) => m.deletable))].map((e) => e[1]).slice(0, numb);
                await channel
                    .bulkDelete(final, true)
                    .then((messages) => {
                        total += messages?.size || 0;
                    })
                    .catch(async (error) => {
                        console.error("error →", error);
                        return await interaction.editReply({
                            content: `There was an error, check the console/tell the Developer to do so ^-^"!`,
                        });
                    });
            }
            if (i == 1)
                await interaction.editReply({
                    content: `Got rid of: ${total} messages ${plural(total)} ${user ? `that ${user} sent` : ``} from ${channel}`,
                });
        }
    },
};

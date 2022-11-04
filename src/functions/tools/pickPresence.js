const { ActivityType } = require("discord.js");

/**
 * @type {{type: ActivityType; text: string; status: string}[]}
 */
const CLIENT_PRESENCES = [//
  {
    type: ActivityType.Watching,
    text: "le tardis avec admiration",
    status: "online",
  },
  {
    type: ActivityType.Listening,
    text: "for commands",
    status: "idle",
  },
  {
    type: ActivityType.Playing,
    text: "à sauver le docteur",
    status: "dnd",
  },
];

module.exports = (client) => {
  client.pickPresence = async () => {
    const choice =
      CLIENT_PRESENCES[
        Math.floor(Math.random() * (CLIENT_PRESENCES.length - 1))
      ];

    client.user.setPresence({
      activities: [
        {
          name: choice.text,
          type: choice.type,
        },
      ],
      status: choice.status,
    });
  };
};

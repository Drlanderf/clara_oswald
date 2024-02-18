const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
const { checkDBFindGuildID } = require("../mongo/checkDBFindGuildID");

// Function to send a notification message for Twitter updates
const sendTwitterNotification = (role, username, tweet) =>
  `:loudspeaker: Hey <@&${role}> look\n**${username}** tweeted:\n${tweet}`;

async function checkTwitter(interaction, client) {
  const guildProfile = await checkDBFindGuildID(interaction.guildId); // Replace with your actual function
  // Additional properties from guildProfile you may need
  const myTwitterUsername = guildProfile.twitterUsername; // Replace with the actual property name
  const myTwitterGuildChannelID = guildProfile.guildTwitterChannel; // Replace with the actual property name
  const myTwitterRoleID = guildProfile.roleTwitterNotificationId; // Replace with the actual property name

  // Check if necessary properties are set up
  if (!myTwitterUsername || !myTwitterGuildChannelID || !myTwitterRoleID)
    return;

  // Fetch Twitter data
  const twitterApiResponse = await fetch(
    `https://api.twitter.com/2/tweets?screen_name=${myTwitterUsername}`, // Replace with the actual Twitter API endpoint
    {
      headers: {
        Authorization: `Bearer YOUR_TWITTER_API_KEY`, // Replace with your actual Twitter API key
      },
    }
  );

  // Process Twitter data as needed
  const tweets = await twitterApiResponse.json();

  // Check for new tweets or other conditions you need
  // ...

  // Example: Send a notification for the latest tweet
  const latestTweet = tweets.data[0]; // Assuming the latest tweet is at index 0
  const tweetContent = latestTweet.text; // Adjust property name based on the actual structure of the Twitter API response

  // Create Discord Embed for the tweet
  const embed = new EmbedBuilder()
    .setAuthor({
      name: `${myTwitterUsername}`,
      url: `https://twitter.com/${myTwitterUsername}`,
    })
    .setDescription(tweetContent)
    .setColor("Blue");

  // Send the notification message
  try {
    await client.channels.cache.get(myTwitterGuildChannelID).send({
      embeds: [embed],
      content: sendTwitterNotification(myTwitterRoleID, myTwitterUsername, tweetContent),
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { checkTwitter };

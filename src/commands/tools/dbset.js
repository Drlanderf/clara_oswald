const { SlashCommandBuilder } = require("discord.js");
const Guild = require(`../../schemas/guild`);
const mongoose = require(`mongoose`);
const chalk = require("chalk");
const {checkDBFindGuildID}= require("../../functions/mongo/checkDBFindGuildID")
const{createNewDBEntry}=require("../../functions/mongo/createNewDBEntry")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("dbset")
    .setDescription("Allows you to set options such as auto replies")
    .addStringOption((option) =>
      option
        .setName(`property`)
        .setDescription(
          `Name of the property you want to set, refer to the doc`
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName(`string`)
        .setDescription(`String for the property`)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    console.log("[Command] dbset successfully apply");
    const property = interaction.options.getString(`property`);
    const string = interaction.options.getString(`string`);
    console.log(`Want this ${property} with this value: ${string}`);
    /*let guildProfile = await Guild.findOne({
      guildId: interaction.guild.id,
    });*/
    let guildProfile = await checkDBFindGuildID(interaction.guild.id);
    if (!guildProfile) {
      await createNewDBEntry(guildProfile, interaction.guild.id,client);
    } else {
      switch (property) {
        case "guildJoinChannel":
          await guildProfile
            .updateOne({ guildJoinChannel: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "guildLeavingChannel":
          await guildProfile
            .updateOne({ guildLeavingChannel: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "guildAutoLogChannel":
          await guildProfile
            .updateOne({ guildAutoLogChannel: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "guildYoutubeChannel":
          await guildProfile
            .updateOne({ guildYoutubeChannel: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "guildTwitchChannel":
          await guildProfile
            .updateOne({ guildTwitchChannel: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "roleId00":
          await guildProfile
            .updateOne({ roleId00: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "roleId01":
          await guildProfile
            .updateOne({ roleId01: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "roleId02":
          await guildProfile
            .updateOne({ roleId02: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "roleTwitchNotificationId":
          await guildProfile
            .updateOne({ roleTwitchNotificationId: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "roleYoutubeNotificationId":
          await guildProfile
            .updateOne({ roleYoutubeNotificationId: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "customWelcomeMessage":
          await guildProfile
            .updateOne({ customWelcomeMessage: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "customLeavingMessage00":
          await guildProfile
            .updateOne({ customLeavingMessage00: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "customLeavingMessage01":
          await guildProfile
            .updateOne({ customLeavingMessage01: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "customLeavingMessage02":
          await guildProfile
            .updateOne({ customLeavingMessage02: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "customLeavingMessage03":
          await guildProfile
            .updateOne({ customLeavingMessage03: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "twitchChannelName":
          await guildProfile
            .updateOne({ twitchChannelName: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "youtubeChannelId00":
          await guildProfile
            .updateOne({ youtubeChannelId00: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "testingReplyVar00":
          await guildProfile
            .updateOne({ testingReplyVar00: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "replyVar00":
          await guildProfile
            .updateOne({ replyVar00: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "testingReplyVar01":
          await guildProfile
            .updateOne({ testingReplyVar01: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        case "replyVar01":
          await guildProfile
            .updateOne({ replyVar01: string })
            .catch(console.error);
          await guildProfile.save().catch(console.error);
          console.log(`[${property}] Applying value: ${string}`);
          await interaction.reply({
            content: `[${property}] Applying value: ${string}`,
          });
          break;
        default:
          await interaction.reply({
            content: `Wrong property name, checkout the doc !`,
          });
          break;
      }
    }
  },
};

function getCounterChannelName(memberCount) {
  let name;

  switch (true) {
    case memberCount < 1000:
      name = `👥 ${memberCount} membres`;
      break;
    case memberCount < 1000000:
      name = `👥 ${Math.floor(memberCount / 1000)}k membres Discord`;
      break;
    default:
      name = `👥 ${Math.floor(memberCount / 1000000)}M membres Discord`;
      break;
  }

  return name;
}
module.exports = { getCounterChannelName };
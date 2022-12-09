module.exports = (interaction, REGEX) => {
  const filter = (msg) => msg.author.id === interaction.user.id && msg.content.toUpperCase().match(REGEX)

  return interaction.channel.createMessageCollector({filter, time: 840000})
}
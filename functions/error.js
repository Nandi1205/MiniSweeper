const makeEmbed = require('./make-embed.js')

module.exports = (interaction, errorMessage) => {
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle('❌ Error')
      .setDescription(errorMessage)
    ],
    ephemeral: true
  })

  return false
}
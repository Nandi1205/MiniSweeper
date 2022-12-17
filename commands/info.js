const packageJSON = require('../package.json')
const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle(':notepad_spiral: Info')
      .setDescription(`About: *${packageJSON.description}*\nVersion: *${packageJSON.version}*\nDeveloper: *${packageJSON.author}*\nGitHub: *[GitHub](https://github.com/Nandi1205/MiniSweeper)*`)
    ],
    ephemeral: true
  })
}
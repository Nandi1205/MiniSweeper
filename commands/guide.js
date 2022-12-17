const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle(':notebook_with_decorative_cover: Guide')
      .setDescription('Use ``/minesweeper`` to start a game.\n\nTo play, send messages in this format: ``x.y#``.\n``x`` - The x coordinate of the tile you want to interact with.\n``y`` - The y coordinate of the tile you want to interact with.\n``#`` - (optional) What you want to do with the interacted tile. ``!`` to flag, ``?`` to mark and ``(nothing)`` to reveal the tile.\n\nThe game ends if a mine is revealed, all empty tiles are revealed, or if the time limit is reached.\n\nGame layout:\n``(board)`` - A visual representation of the minesweeper board.\n``Status`` - The game\'s status. Can be: ``Ongoing``, ``Won``, ``Lost``, or ``Timeout``.\n``Mines left`` - the number of mines left (that have not been flagged).\n``Time left`` - The time left before the game timeouts.')
    ],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}
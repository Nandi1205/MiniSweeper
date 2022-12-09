const makeEmbed = require('../../functions/make-embed.js')

module.exports = (interaction, ms) => {
  const COORDINATE_EMOJIS = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:', ':hash:', ':hash:']
  const TILE_NUMBERS = ['<:0_:1047828460711710760>', '<:1_:1047828462083248158>', '<:2_:1047828463245066291>', '<:3_:1047828465447084063>', '<:4_:1047828467393237002>', '<:5_:1047828468576026706>', '<:6_:1047828470010482748>', '<:7_:1047828471369441290>', '<:8_:1047828472485134356>']

  let boardString = ''

  //////////

  for (let y = 0; y < ms.BOARD_SIZE; y ++) {
    boardString += COORDINATE_EMOJIS[ms.BOARD_SIZE - y - 1]

    for (let x = 0; x < ms.BOARD_SIZE; x ++) {
      let tile = ms.board[y][x]

      if (tile.state === ms.STATES.unexplored) boardString += '<:x_:1047828477879013417>'
      else if (tile.state === ms.STATES.flagged) boardString += '<:f_:1047828473495945237>'
      else if (tile.state === ms.STATES.marked) boardString += '<:q_:1047828476184502304>'
      else if (tile.state === ms.STATES.explored) {
        if (tile.isMine) boardString += '<:m_:1047828474800373792>'
        else boardString += TILE_NUMBERS[tile.adjacentMines]
      }
    }

    boardString += '\n'
  }

  boardString += ':asterisk:'
  for (let i = 0; i < ms.BOARD_SIZE; i ++) {
    boardString += COORDINATE_EMOJIS[i]
  }

  //////////

  //Get game status
  if (ms.board.every((row) => row.every((tile) => (tile.isMine && tile.state !== ms.STATES.explored) || (!tile.isMine && tile.state === ms.STATES.explored)))) {
    ms.gameStatus = 'Won'
  } else if (ms.board.some((row) => row.some((tile) => tile.isMine && tile.state === ms.STATES.explored))) {
    ms.gameStatus = 'Lost'
  }

  //Get remaining number of mines
  let remainingMines = ms.MINE_COUNT
  ms.board.forEach(row => {
    row.forEach(tile => {
      if (tile.state === ms.STATES.flagged || (tile.isMine && tile.state === ms.STATES.explored)) remainingMines --
    })
  })

  //Get remaining time
  let timeLeftSeconds = Math.floor((840000 - (new Date().getTime() - ms.START_TIME)) / 1000)
  if (timeLeftSeconds < 0) timeLeftSeconds = 0

  let timeLeftString = `${Math.floor(timeLeftSeconds / 60)}m ${timeLeftSeconds % 60}s`

  //////////

  return {
    embeds: [
      makeEmbed()
      .setTitle(':bomb: Minesweeper')
      .setDescription(boardString)
      .addFields({
        name: 'Game Statistics',
        value: `Status: ${ms.gameStatus}\nMines left: ${remainingMines}\nTime left: ${timeLeftString}`
      })
    ],
    ephemeral: interaction.options.getBoolean('private') ?? false
  }
}
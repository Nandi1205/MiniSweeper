const checkGameEnd = require('../functions/minesweeper/check-game-end.js')
const exploreTile = require('../functions/minesweeper/explore-tile.js')
const makeReply = require('../functions/minesweeper/make-reply.js')
const makeBoard = require('../functions/minesweeper/make-board.js')
const makeCollector = require('../functions/minesweeper/make-collector.js')
const makeRegex = require('../functions/minesweeper/make-regex.js')
const hasMinesweeperPerms = require('../functions/perms/has-minesweeper-perms.js')

module.exports = (interaction) => {
  if (!hasMinesweeperPerms(interaction, interaction.channel)) return

  //////////

  let ms = {
    START_TIME: new Date().getTime(),
    gameStatus: 'Ongoing',
    BOARD_SIZE: interaction.options.getInteger('size'),
    MINE_COUNT: null,
    STATES: {unexplored: 0, flagged: 1, marked: 2, explored: 3},
    board: null
  }

  ms.MINE_COUNT = Math.ceil(ms.BOARD_SIZE * ms.BOARD_SIZE * 0.2)
  ms.board = makeBoard(ms)

  interaction.reply(makeReply(interaction, ms))

  const REGEX = makeRegex(ms)
  const collector = makeCollector(interaction, REGEX)

  //////////

  collector.on('collect', (msg) => {
    let madeChange = false

    for (let argument of msg.content.toUpperCase().split(' ')) {
      if (!argument.match(`^${REGEX}$`)) continue

      const COMMAND = argument.slice(-1)
      if (argument.match('[!?]')) argument = argument.slice(0, -1)

      const TILE_Y = ms.BOARD_SIZE - argument.slice(argument.indexOf('.') + 1)
      const TILE_X = argument.slice(0, argument.indexOf('.')) - 1

      //Update board
      let tile = ms.board[TILE_Y][TILE_X]

      if (tile.state === ms.STATES.explored) return

      if (COMMAND === '!') {
        if (tile.state === ms.STATES.flagged) tile.state = ms.STATES.unexplored
        else tile.state = ms.STATES.flagged
      } else if (tile.state === ms.STATES.flagged) {
        return
      } else if (COMMAND === '?') {
        if (tile.state === ms.STATES.marked) tile.state = ms.STATES.unexplored
        else tile.state = ms.STATES.marked
      } else {
        exploreTile(ms, ms.board, TILE_Y, TILE_X)
      }

      madeChange = true
    }

    if (hasMinesweeperPerms(interaction, interaction.channel) && !checkGameEnd(ms, collector) && madeChange) interaction.followUp(makeReply(interaction, ms))
  })
  collector.on('end', () => {
    if (new Date().getTime() - ms.START_TIME >= 840000) ms.gameStatus = 'Timeout'

    interaction.followUp(makeReply(interaction, ms))
  })
}
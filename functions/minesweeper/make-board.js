const exploreTile = require('./explore-tile.js')

module.exports = (ms) => {
  let board = []
  let spawns = []

  //////////

  //Fill board with default values.
  for (let y = 0; y < ms.BOARD_SIZE; y ++) {
    board[y] = []
    spawns[y] = []

    for (let x = 0; x < ms.BOARD_SIZE; x ++) {
      board[y][x] = {adjacentMines: 0, isMine: false, state: ms.STATES.unexplored}
      spawns[y][x] = {y: y, x: x}
    }
  }

  //////////

  //Add mines.
  for (let i = 0; i < ms.MINE_COUNT; i ++) {
    const Y_I = Math.floor(Math.random() * spawns.length)
    const X_I = Math.floor(Math.random() * spawns[Y_I].length)

    const Y_V = spawns[Y_I][X_I].y
    const X_V = spawns[Y_I][X_I].x

    board[Y_V][X_V].isMine = true
    for (let y = -1; y <= 1; y ++) {
      for (let x = -1; x <= 1; x ++) {
        if (board[Y_V + y]?.[X_V + x]) {
          board[Y_V + y][X_V + x].adjacentMines ++
        }
      }
    }

    spawns[Y_I].splice(X_I, 1)
    if (spawns[Y_I].length === 0) spawns.splice(Y_I, 1)
  }

  //////////

  //Make starting positions.
  let startPositions = []

  for (let y = 0; y < spawns.length; y ++) {
    for (let x = 0; x < spawns[y].length; x ++) {
      let spawn = spawns[y][x]

      if (board[spawn.y][spawn.x].adjacentMines === 0) startPositions.push(spawn)
    }
  }

  //Get, then explore start position.
  const START_POSITION = startPositions[Math.floor(Math.random() * startPositions.length)]

  exploreTile(ms, board, START_POSITION.y, START_POSITION.x)

  //////////

  return board
}
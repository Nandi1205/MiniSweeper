module.exports = function exploreTile (ms, board, TILE_Y, TILE_X) {
  let tile = board[TILE_Y][TILE_X]

  //Explore tile.
  tile.state = ms.STATES.explored

  if (tile.adjacentMines !== 0) return

  //Explore nearby tiles.
  for (let y = -1; y <= 1; y ++) {
    for (let x = -1; x <= 1; x ++) {
      let adjTile = board[TILE_Y + y]?.[TILE_X + x]

      if (!adjTile || adjTile.state === ms.STATES.explored) continue

      exploreTile(ms, board, TILE_Y + y, TILE_X + x)
    }
  }
}
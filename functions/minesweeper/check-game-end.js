module.exports = (ms, collector) => {
  if (ms.board.every((row) => row.every((tile) => (tile.isMine && tile.state !== ms.STATES.explored) || (!tile.isMine && tile.state === ms.STATES.explored)))) ms.gameStatus = 'Won'
  else if (ms.board.some((row) => row.some((tile) => tile.isMine && tile.state === ms.STATES.explored))) ms.gameStatus = 'Lost'
  else return false

  collector.stop()

  return true
}
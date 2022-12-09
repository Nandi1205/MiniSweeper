module.exports = (ms) => {
  const REGEX_PART = ms.BOARD_SIZE < 10 ? `[1-${ms.BOARD_SIZE}]` : `(1[0-${parseInt(ms.BOARD_SIZE.toString().split('').map(Number))[1]}]|[1-9])`
  return `${REGEX_PART}\\.${REGEX_PART}[!?]?`
}
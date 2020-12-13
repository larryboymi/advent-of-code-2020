const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'

const windowOccurrences = window => Object.keys(window).reduce((acc, curr) => {
  const isOccupied = window[curr] === OCCUPIED ? 1 : 0
  return acc + isOccupied
}
, 0)

const countOccurrences = (arr, val) => arr.reduce((a, v) => v === val ? a + 1 : a, 0)

const countConfig = config => config.reduce((acc, curr) =>
  acc + countOccurrences(curr, OCCUPIED)
, 0)

const moveN = (distance, row, column) => ({row: row - distance, column})
const moveS = (distance, row, column) => ({row: row + distance, column})
const moveE = (distance, row, column) => ({row, column: column + distance})
const moveW = (distance, row, column) => ({row, column: column - distance})
const moveNW = (distance, row, column) => ({row: row - distance, column: column - distance})
const moveSW = (distance, row, column) => ({row: row + distance, column: column - distance})
const moveNE = (distance, row, column) => ({row: row - distance, column: column + distance})
const moveSE = (distance, row, column) => ({row: row + distance, column: column + distance})

const getSeat = directionFunc => (config, row, column) => {
  let distance = 1
  let location = config[row][column]
  while (location) {
    const indices = directionFunc(distance, row, column)
    location = config[indices.row] && config[indices.row][indices.column] ? config[indices.row][indices.column] : null
    if (location !== '.') {
      break;
    }
    distance++
  }
  return location
}

const getSeats = (config, row, column) => ({
  N: getSeat(moveN)(config, row, column),
  NW: getSeat(moveNW)(config, row, column),
  S: getSeat(moveS)(config, row, column),
  SW: getSeat(moveSW)(config, row, column),
  E: getSeat(moveE)(config, row, column),
  NE: getSeat(moveNE)(config, row, column),
  W: getSeat(moveW)(config, row, column),
  SE: getSeat(moveSE)(config, row, column)
})

const takenAdjacent = (config, row, column) => {
  const window = getSeats(config, row, column)
  return windowOccurrences(window)
}

const copyArray = origArray => JSON.parse(JSON.stringify(origArray))

const takeASeat = beginningConfig => {
  let changes = 0, config = copyArray(beginningConfig), copyConfig = null
  do {
    changes = 0
    copyConfig = copyArray(config)
    for (let i = 0; i < config.length; i++) {
      for (let j = 0; j < config[i].length; j++) {
        const occurrences = takenAdjacent(copyConfig, i, j)
        if (copyConfig[i][j] === EMPTY && occurrences === 0) {
          changes++
          config[i][j] = OCCUPIED
        } else if (copyConfig[i][j] === OCCUPIED && occurrences >= 5) {
          changes++
          config[i][j] = EMPTY
        }
      }
    }
  } while (changes > 0)
  return config
}

const configOrig = text.split('\n').map(str => Array.from(str))
const endConfig = takeASeat(configOrig)
console.log(`Total seats taken is ${countConfig(endConfig)}`)


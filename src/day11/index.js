const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'

const countOccurrences = (arr, val) => arr.reduce((a, v) => v === val ? a + 1 : a, 0)

const windowOccurrences = window => window.reduce((acc, curr) => 
  acc + countOccurrences(curr, OCCUPIED)
  , 0)

const takenAdjacent = (config, row, column) => {
  const window = []
  if (row !== 0) {
    window.push(config[row - 1].slice(column === 0 ? column : column - 1, column + 2))
  }
  window.push(config[row].slice(column === 0 ? column : column - 1, column + 2))
  if (row !== config.length - 1) {
    window.push(config[row + 1].slice(column === 0 ? column : column - 1, column + 2))
  }
  const numOccurrences = windowOccurrences(window)
  return config[row][column] === OCCUPIED ? numOccurrences - 1 : numOccurrences
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
        } else if (copyConfig[i][j] === OCCUPIED && occurrences >= 4) {
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
console.log(`Total seats taken is ${windowOccurrences(endConfig)}`)


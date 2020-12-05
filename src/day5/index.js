const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const getLocation = (char, lowerBound, upperBound) =>
  (char === 'F' || char === 'L')
    ? { newLower: lowerBound, newUpper: Math.floor((upperBound + lowerBound) / 2) }
    : { newLower: Math.ceil((upperBound + lowerBound) / 2), newUpper: upperBound }

const findHalf = (passInfo, index, lowerBound, upperBound) => {
  if (index === passInfo.length) {
    return lowerBound
  }
  const { newLower, newUpper } = getLocation(passInfo[index], lowerBound, upperBound)
  return findHalf(passInfo, index + 1, newLower, newUpper)
}

const getBoardingPass = passInfo => {
  const row = findHalf(passInfo.substr(0, 7), 0, 0, 127)
  const column = findHalf(passInfo.substr(7, 3), 0, 0, 7)
  return {
    row, column, id: row * 8 + column
  }
}

const getMissingIDs = (ids, max) => {
  const missing = [];
  for (let i = 1; i <= max; i++) {
    if (ids.indexOf(i) == -1) {
      missing.push(i);
    }
  }
  return missing
}

const passes = text.split('\n').map(getBoardingPass)
const passIDs = passes.map( pass => pass.id )
const maxID = passIDs.reduce((acc, curr) => Math.max(acc, curr))
console.log(`The max ID is ${maxID}`)
console.log(`The missing IDs are ${getMissingIDs(passIDs, maxID)}`)
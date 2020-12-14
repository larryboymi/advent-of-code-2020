const fs = require('fs')
const text = fs.readFileSync('sample.txt', { encoding: 'utf8' })
const directions = ['N', 'E', 'S', 'W']
const opposites = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E'
}

const getInstructions = input => ({
  direction: input.substring(0, 1),
  distance: parseInt(input.substring(1, input.length))
})

const getDirection = (origDirection, amount) => {
  const delta = amount/90
  const origIdx = directions.findIndex(h => h === origDirection)
  return directions[(delta < 0 ? origIdx + directions.length + delta : origIdx + delta) % directions.length]
}

const getNextLocation = (location, instruction) => {
  const isSameDirection = instruction.direction === location.direction
  switch (instruction.direction) {
    case 'L':
    case 'R':
      const amount = (instruction.direction === 'L' ? -1 : 1) * instruction.distance
      const direction = getDirection(location.direction, amount)
      location.direction = direction
      break;
    default:
      const changeDirection = instruction.direction === 'F' ? location.direction : instruction.direction
      location[changeDirection] = location[changeDirection] + instruction.distance
      break;
  }
  return location
}

const getManhattanDistance = location =>
  Math.abs(location.E - location.W) + Math.abs(location.N - location.S)

const getDestination = instructions => {
  let location = {
    direction: 'E',
    E: 0,
    W: 0,
    N: 0,
    S: 0
  }
  instructions.forEach(instruction => {
    location = getNextLocation(location, instruction)
  })
  return location
}

const instructions = text.split('\n').map(getInstructions)
const location = getDestination(instructions)

console.log(`The manhattan distance is ${getManhattanDistance(location)}`)
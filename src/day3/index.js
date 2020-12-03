const fs = require("fs")
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const treeChar = '#'

const getPatternLocation = ({ vertical, horizontal }, width, verticalTravel, horizontalTravel) => ({
  vertical: vertical + verticalTravel,
  horizontal: (horizontal + horizontalTravel) % width
})

const treesHit = (pattern, verticalTravel, horizontalTravel) => {
  let totalTreesHit = 0
  let location = { vertical: 0, horizontal: 0 }
  while (location.vertical < pattern.length) {
    const charAtLocation = pattern[location.vertical][location.horizontal]
    if (charAtLocation === treeChar) {
      totalTreesHit++
    }
    location = getPatternLocation(location, pattern[0].length, verticalTravel, horizontalTravel)
  }
  return totalTreesHit
}

const pattern = text.split('\n')
const numTreesHit = [treesHit(pattern, 1, 1), treesHit(pattern, 1, 3), treesHit(pattern, 1, 5), treesHit(pattern, 1, 7), treesHit(pattern, 2, 1)]
const total = numTreesHit.reduce((acc, curr) => acc * curr, 1)
console.log(`The number of trees hit was ${total}`)
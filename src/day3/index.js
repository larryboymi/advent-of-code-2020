const fs = require("fs")
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const verticalTravel = 1
const horizontalTravel = 3
const treeChar = '#'

const getPatternLocation = ({ vertical, horizontal }, width) => {
  return {
    vertical: vertical + verticalTravel,
    horizontal: (horizontal + horizontalTravel) % width
  }
}

const treesHit = pattern => {
  let totalTreesHit = 0
  let location = { vertical: 0, horizontal: 0 }
  while (location.vertical < pattern.length) {
    const charAtLocation = pattern[location.vertical][location.horizontal]
    //console.log(`About to visit ${charAtLocation}`)
    if (charAtLocation === treeChar) {
      totalTreesHit++
    }
    location = getPatternLocation(location, pattern[0].length)
    //console.log(`Moving to location ${JSON.stringify(location)}`)
  }
  return totalTreesHit
}

const pattern = text.split('\n')
const numTreesHit = treesHit(pattern)
console.log(`The number of trees hit was ${numTreesHit}`)
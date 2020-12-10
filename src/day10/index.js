const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const numericSortCompare = (a, b) => a - b


const addEnds = numbers => {
  numbers.push(numbers[numbers.length - 1] + 3)
  numbers.unshift(0)
}

const getDifferences = numbers => {
  const differences = new Array(3).fill(0)
  for (let i = 0; i < numbers.length - 1; i++) {
    const difference = numbers[i + 1] - numbers[i]
    differences[difference - 1] = differences[difference - 1] + 1
  }
  return differences
}

const numbers = text.split('\n').map(Number).sort(numericSortCompare)
addEnds(numbers)

console.log(`The samples are ${numbers}`)
const differences = getDifferences(numbers)
console.log(`the differences are ${differences}`)
console.log(`Answer is ${differences[0] * differences[2]}`)


const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const numericSortCompare = (a, b) => a - b
const VALID_DISTANCE = 3
const permutations = []

const getDifferences = numbers => {
  const differences = new Array(3).fill(0)
  for (let i = 0; i < numbers.length - 1; i++) {
    const difference = numbers[i + 1] - numbers[i]
    differences[difference - 1] = differences[difference - 1] + 1
  }
  return differences
}

const findPermutations = (numbers, begin, end) => {
  if (!permutations[begin] && permutations[begin] !== 0) {
    if (numbers.length === 1 && numbers[0] === end) {
      permutations[begin] = 1
    } else {
      const numChoices = numbers.reduce((acc, curr) =>
        curr > begin && curr <= (begin + VALID_DISTANCE)
          ? acc + findPermutations(numbers, curr, end)
          : acc
      , 0)
  
      permutations[begin] = begin + VALID_DISTANCE >= end
        ? numChoices + 1
        : numChoices  
    }
  }
  return permutations[begin]
}

const numbers = text.split('\n').map(Number).sort(numericSortCompare)
numbers.push(numbers[numbers.length - 1] + 3)

const differences = getDifferences(numbers)
console.log(`Day 10 part 1: ${(differences[0] + 1) * (differences[2])}`)

const validPermutations = findPermutations(numbers, 0, numbers[numbers.length - 1] + VALID_DISTANCE)
console.log(`Day 10 part 2: ${validPermutations}`)
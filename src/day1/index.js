const fs = require("fs")
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const goalTotal = 2020

const findPartner = (index1, index2, numberArray) => 
  numberArray.findIndex((number, idx) =>
    idx !== index1 && idx !== index2 && index1 !== index2 && 
    (numberArray[index1] + numberArray[index2] + number) === goalTotal)

const findNumbers = numbers => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      const partner = findPartner(i, j, numbers)
      if (partner !== -1) {
        console.log(`The indexes are ${i}, ${j}, and ${partner} or ${numbers[i]}, ${numbers[j]}, and ${numbers[partner]}`)
        return numbers[i] * numbers[j] * numbers[partner]
      }
    }
  }
}

const numbers = text.split('\n').map(Number)

const product = findNumbers(numbers)

console.log(`The answer is ${product}`)
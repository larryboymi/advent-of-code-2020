const fs = require("fs")
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const goalTotal = 2020

const findPartner = (index, numberArray) => 
  numberArray.findIndex((number, idx) =>
    idx !== index && (numberArray[index] + number) === goalTotal)

const findNumbers = numbers => {
  for (let i = 0; i < numbers.length; i++) {
    const partner = findPartner(i, numbers)
    if (partner !== -1) {
      console.log(`The indexes are ${i} and ${partner} or ${numbers[i]} and ${numbers[partner]}`)
      return numbers[i] * numbers[partner]
    }
  }
}

const numbers = text.split('\n').map(Number)

const product = findNumbers(numbers)

console.log(`The answer is ${product}`)
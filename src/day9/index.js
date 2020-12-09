const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })


const containsValidOperands = (window, solution) =>
  window.find(num1 => window.some(num2 =>
    (num1 + num2) === solution && num1 !== num2
  ))

const findInvalid = (numbers, windowSize) => {
  for (let i = windowSize; i < numbers.length; i++) {
    if (!containsValidOperands(numbers.slice(i - windowSize, i), numbers[i])) {
      return numbers[i]
    }
  }
}

const numbers = text.split('\n').map(Number)

const invalid = findInvalid(numbers, 25)

console.log(`The invalid number is ${invalid}`)
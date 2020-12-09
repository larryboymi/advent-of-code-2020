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

const sumArray = array => array.reduce((acc, curr) => acc + curr, 0)

const findContiguousOperands = (numbers, solution) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let k = i + 1; k < numbers.length; k++) {
      const sum = sumArray(numbers.slice(i, k))
      if (sum === solution) {
        return numbers.slice(i, k)
      } else if (sum > solution) {
        break
      }
    }
  }
}

const numbers = text.split('\n').map(Number)

const invalid = findInvalid(numbers, 25)

console.log(`The invalid number is ${invalid}`)

const operands = findContiguousOperands(numbers, invalid)

console.log(`The encryption weakness is ${Math.min(...operands) + Math.max(...operands)}`)
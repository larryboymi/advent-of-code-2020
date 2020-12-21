const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const {	infixToBinaryTree, evaluate } = require('./aux')

const values = text.split('\n').map(input => evaluate(infixToBinaryTree(input)))
const sum = values.reduce((acc, curr) => acc + curr, 0)

console.log(`The value is ${sum}`)


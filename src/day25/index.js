const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const keys = text.split('\n').map(Number)

const getNewCheck = (check, subject) => {
  check = check * subject
  check = check % 20201227
  return check
}


const getLoop = (subject, desired) => {
  let times = 0
  let check = 1
  while (check != desired) {
    times++
    check = getNewCheck(check, subject)
  }
  return times
}


console.log(`The keys are ${keys}`)
const check0 = getLoop(7, keys[0])
console.log(`The first value is ${check0}`)
const check1 = getLoop(7, keys[1])
console.log(`The second value is ${check1}`)

let encryptionKey0 = 1
for (let i = 0; i < check0; i++) {
  encryptionKey0 = getNewCheck(encryptionKey0, keys[1])
}
console.log(`The encryption key is ${encryptionKey0}`)

let encryptionKey1 = 1
for (let i = 0; i < check1; i++) {
  encryptionKey1 = getNewCheck(encryptionKey1, keys[0])
}
console.log(`The encryption 2 key is ${encryptionKey1}`)


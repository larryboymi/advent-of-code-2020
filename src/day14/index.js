const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const MASK_TYPE = 'mask'
const MEM_TYPE = 'mem'
const ADDR_REGEX = /mem\[(\d+)\]/
const MASK_LENGTH = 36

const getAddress = instructionToken => {
  const addrParts = instructionToken.match(ADDR_REGEX)
  console.log(`${instructionToken} ${JSON.stringify(addrParts)}`)
  return Number(addrParts[1])
}

const getInstruction = line => {
  const instruction = line.split(' = ')
  if (instruction[0] === 'mask') {
    return {
      type: MASK_TYPE,
      value: Array.from(instruction[1])
    }
  }
  return {
    type: MEM_TYPE,
    address: getAddress(instruction[0]),
    value: Number(instruction[1])
  }
}

const applyValueMask = (value, mask) => {
  const newValue = Array.from(value.toString(2).padStart(MASK_LENGTH, '0'))
  for (let i = mask.length - 1; i >= 0; i--) {
    if (mask[i] !== 'X') {
      newValue[i] = mask[i]
    }
  }
  return parseInt(newValue.join(''), 2)
}

const getMemory = memory =>
  Object.keys(memory).reduce((acc, curr) =>
    acc + memory[curr]
  , 0)

const instructions = text.split('\n').map(getInstruction)

const memory = {}
let mask = []
for (let i = 0; i < instructions.length; i++) {
  if (instructions[i].type === MASK_TYPE) {
    console.log(`Setting mask to ${instructions[i].value.join('')}`)
    mask = instructions[i].value
  } else {
    const value = applyValueMask(instructions[i].value, mask)
    console.log(`Setting ${instructions[i].address} to ${value}`)
    memory[instructions[i].address] = value
  }
}

const sum = getMemory(memory)
console.log(`The sum is ${sum}`)
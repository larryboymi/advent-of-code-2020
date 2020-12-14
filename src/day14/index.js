const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const MASK_TYPE = 'mask'
const MEM_TYPE = 'mem'
const WILDCARD = 'X'
const ADDR_REGEX = /mem\[(\d+)\]/
const MASK_LENGTH = 36

const getAddress = instructionToken => {
  const addrParts = instructionToken.match(ADDR_REGEX)
  return Number(addrParts[1])
}

const getInstruction = line => {
  const instruction = line.split(' = ')
  if (instruction[0] === 'mask') {
    return {
      type: MASK_TYPE,
      value: instruction[1]
    }
  }
  return {
    type: MEM_TYPE,
    address: getAddress(instruction[0]),
    value: Number(instruction[1])
  }
}

const applyZeroMask = (value, mask) => {
  const newValue = Array.from(value.toString(2).padStart(MASK_LENGTH, '0'))
  for (let i = mask.length - 1; i >= 0; i--) {
    if (mask[i] === WILDCARD) {
      newValue[i] = '0'
    } else if (mask[i] === '1') {
      newValue[i] = '1'
    }
  }
  return parseInt(newValue.join(''), 2)
}

const getMemory = memory =>
  Object.keys(memory).reduce((acc, curr) =>
    acc + memory[curr]
  , 0)

const getLocations = (initialAddr, mask) => {
  const floats = getFloatingBits(mask)
  const combos = getCombinations(floats).map(arr => arr.reduce((acc, curr) => acc + curr, 0))
  const distinctCombos = [...new Set(combos)]
  const zeroAddress = applyZeroMask(initialAddr, mask)
  return distinctCombos.map(val => val + zeroAddress)
}

const getCombinations = array =>
  new Array(1 << array.length)
    .fill()
    .map((e1, i) => array.filter((e2, j) => i & 1 << j))

const getFloatingBits = str =>
  Array.from(str).reduce((acc, curr, idx) => {
    if (curr === WILDCARD) {
      acc.push(getDecimalValue(idx))
    }
    return acc
  }, [])

const instructions = text.split('\n').map(getInstruction)

const getDecimalValue = idx =>
  2**(MASK_LENGTH - idx - 1)

const memory = {}
let mask = []
for (let i = 0; i < instructions.length; i++) {
  if (instructions[i].type === MASK_TYPE) {
    mask = instructions[i].value
  } else {
    const writeLocations = getLocations(instructions[i].address, mask)
    for (let j = 0; j < writeLocations.length; j++) {
      memory[writeLocations[j]] = instructions[i].value
    } 
  }
}

const sum = getMemory(memory)
console.log(`The sum is ${sum}`)
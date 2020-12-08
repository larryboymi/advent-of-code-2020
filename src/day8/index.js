const instRegex = /(.*) ([+-])(\d+)/
const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const allUnique = array =>
  array.length === new Set(array).size;

const getInstruction = line => {
  const parts = line.match(instRegex)
  return {
    instruction: parts[1],
    sign: parts[2],
    offset: Number(parts[3])
  }
}

const processInstructions = instructions => {
  let acc = 0, pos = 0
  const instVisited = [0]
  while (allUnique(instVisited) && pos < instructions.length) {
    const currentInstruction = instructions[pos]
    let nextPos = 0
    switch (currentInstruction.instruction) {
      case 'jmp':
        nextPos = currentInstruction.sign === '+' ? pos + currentInstruction.offset : pos - currentInstruction.offset
        break;
      case 'acc':
        acc = currentInstruction.sign === '+' ? acc + currentInstruction.offset : acc - currentInstruction.offset
        nextPos = pos + 1
        break;
      case 'nop':
        nextPos = pos + 1
        break;
    }
    instVisited.push(nextPos)
    pos = nextPos
  }
  return { acc, instVisited }
}

const findInstruction = (instructions, visited) => {
  for (let i = 0; i < visited.length; i++) {
    const instruction = instructions[visited[i]]
    const isJmp = instruction.instruction === 'jmp'
    if (instruction.instruction === 'acc') {
      continue
    } else {
      instructions[visited[i]].instruction = isJmp ? 'nop' : 'jmp'
      const check = processInstructions(instructions)
      if (check.instVisited.includes(instructions.length - 1)) {
        console.log(`We had to change instruction ${visited[i]}`)
        break
      }
      instructions[visited[i]].instruction = isJmp ? 'jmp' : 'nop'
    }
  }
}

const instructions = text.split('\n').map(getInstruction)
const initialRun = processInstructions(instructions)
console.log(`The acc when the loop hits is ${initialRun.acc}`)

//findInstruction(instructions, initialRun.instVisited)
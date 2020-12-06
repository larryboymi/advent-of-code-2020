const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const getCommon = individuals =>
  individuals.shift().filter(a =>
    individuals.every(i => i.indexOf(a) !== -1)
  )

const getGroupCount = groupInput => {
  const individuals = groupInput.split('\n')
  const answers = individuals.map(individual => individual.split(''))
  const common = getCommon(answers)
  return common.length
}

const counts = text.split('\n\n').map(getGroupCount)
const totalCount = counts.reduce((acc, curr) => acc + curr)
console.log(`The total is ${totalCount}`)
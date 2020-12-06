const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const getGroupCount = groupInput => {
  const individuals = groupInput.split('\n')
  const answers = individuals.map(individual => individual.split('')).flat()
  const uniqAnswers =  [...new Set(answers)]
  
  return uniqAnswers.length
}

const counts = text.split('\n\n').map(getGroupCount)
const totalCount = counts.reduce((acc, curr) => acc + curr)
console.log(`The total is ${totalCount}`)
const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const notes = text.split('\n')
const minutes = Number(notes[0])

const getSchedule = id => {
  if (id === 'x') {
    return null
  }
  const idNum = Number(id)
  const times = []
  let routes = 1
  while (true) {
    const busTime = routes * idNum
    times.push(busTime)
    if (busTime > minutes) {
      break;
    }
    routes++
  }
  return times
}

const schedules = notes[1].split(',').map(getSchedule).filter(Boolean)
const closest = schedules.map(schedule => schedule[schedule.length - 1])
const smallest = Math.min(...closest)
const difference = smallest - minutes
console.log(`The wait time is ${difference}`)

const whichBus = closest.findIndex(bus => bus === smallest)
const busId = schedules[whichBus][0]
const product = difference * busId

console.log(`The product is ${product}`)


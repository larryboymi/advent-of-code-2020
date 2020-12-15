const initFunc = (acc, curr, idx) => {
  acc[curr] = {
    prevReadOn: idx + 1
  }
  return acc
}

const isNew = (numObj, lastRead) => !Object.keys(numObj).includes(lastRead)

const actuallyStartGame = numbers => {
  const numObj = numbers.reduce(initFunc, {})
  let lastRead = '0'
  for (let i = numbers.length + 1; i < 2020; i++) {
    if (i === numbers.length + 1 || isNew(numObj, lastRead)) {
      if (lastRead === '0' && !numObj[lastRead]) {
        numObj[lastRead] = {
          prevReadOn: i
        }
        lastRead = '0'
      } else if (lastRead === '0') {
        numObj[lastRead] = {
          prevReadOn: numObj[lastRead].lastReadOn ? numObj[lastRead].lastReadOn : numObj[lastRead].prevReadOn,
          lastReadOn: i
        }
        lastRead = (numObj[lastRead].lastReadOn - numObj[lastRead].prevReadOn).toString()
      } else {
        numObj[lastRead] = {
          prevReadOn: i,
        }
        lastRead = '0'
      }
    } else {
      numObj[lastRead] = {
        prevReadOn: numObj[lastRead].lastReadOn ? numObj[lastRead].lastReadOn : numObj[lastRead].prevReadOn,
        lastReadOn: i
      }
      lastRead = (numObj[lastRead].lastReadOn - numObj[lastRead].prevReadOn).toString()
    }
  }
  return lastRead
}

const numbers = '0,8,15,2,12,1,4'.split(',')
const last = actuallyStartGame(numbers)

console.log(`The last is ${last}`)
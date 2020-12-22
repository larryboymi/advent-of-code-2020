const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })

const getHand = input => {
  const lines = input.split('\n')
  const name = lines[0].trim()
  return {
    name,
    cards: lines.slice(1).map(Number)
  }
}

const playCombat = players => {
  let hands = 0
  while (true) {
    hands++
    const higherPlayer = players[0].cards[0] > players[1].cards[0] ? 0 : 1
    const lowerPlayer = higherPlayer === 0 ? 1 : 0
    players[higherPlayer].cards.push(players[higherPlayer].cards.shift())
    players[higherPlayer].cards.push(players[lowerPlayer].cards.shift())
    keepPlaying = players[lowerPlayer].cards.length !== 0
    if (players[lowerPlayer].cards.length === 0) {
      return higherPlayer
    }
  }
}

const players = text.split('\n\n').map(getHand)
const winner = playCombat(players)
const product = players[winner].cards.reduce((acc, curr, idx) => acc + curr * (players[winner].cards.length - idx), 0)
console.log(`The score is ${product}`)
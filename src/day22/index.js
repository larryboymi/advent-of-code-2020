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

const handEqual = (hand1, hand2) => hand1.length === hand2.length && hand1.reduce((acc, curr, idx) => acc && curr === hand2[idx], true)
const matchAPriorHand = (priorHands, currentHands) => {
  for (let i = 0; i < priorHands.length; i++) {
    if (handEqual(priorHands[i][0], currentHands[0]) && handEqual(priorHands[i][1], currentHands[1])) {
      return true
    }
  }
  return false
}

const playCombatRecursive = (players) => {
  const priorHands = []
  let hands = 0
  while (true) {
    hands++
    if (matchAPriorHand(priorHands, [players[0].cards, players[1].cards])) {
      return 0
    }
    priorHands.push([players[0].cards.slice(), players[1].cards.slice()])
    const cards = [players[0].cards.shift(),  players[1].cards.shift()]
    // console.log(`Cards in play ${cards}, players ${JSON.stringify(players)}`)
    if (cards[0] <= players[0].cards.length && cards[1] <= players[1].cards.length)
    {
      // console.log(`The players have ${JSON.stringify(players)} for round 9`)
      // console.log(`Recursing for round ${hands}`)
      const winner =  playCombatRecursive([{
        ...players[0],
        cards: players[0].cards.slice(0, cards[0])
      }, {
        ...players[1],
        cards: players[1].cards.slice(0, cards[1])
      }])
      const loser = winner === 0 ? 1 : 0
      players[winner].cards.push(cards[winner])
      players[winner].cards.push(cards[loser])
      // console.log(`Player ${winner} wins hand ${hands}`)
      if (players[loser].cards.length === 0) {
        return winner
      }
    } else {
      const winner = cards[0] > cards[1] ? 0 : 1
      const loser = cards[0] > cards[1] ? 1 : 0
      players[winner].cards.push(cards[winner])
      players[winner].cards.push(cards[loser])
      // console.log(`Player ${winner} wins hand ${hands}`)
      if (players[loser].cards.length === 0) {
        return winner
      }
    }
  }
}

// Before either player deals a card, if there was a previous round in this game that had exactly the same cards in the same order in the same players' decks, the game instantly ends in a win for player 1. Previous rounds from other games are not considered. (This prevents infinite games of Recursive Combat, which everyone agrees is a bad idea.)
// Otherwise, this round's cards must be in a new configuration; the players begin the round by each drawing the top card of their deck as normal.
// If both players have at least as many cards remaining in their deck as the value of the card they just drew, the winner of the round is determined by playing a new game of Recursive Combat (see below).
// Otherwise, at least one player must not have enough cards left in their deck to recurse; the winner of the round is the player with the higher-value card.

const players = text.split('\n\n').map(getHand)
const winner = playCombatRecursive(players)
const product = players[winner].cards.reduce((acc, curr, idx) => acc + curr * (players[winner].cards.length - idx), 0)
console.log(`The score is ${product}`)
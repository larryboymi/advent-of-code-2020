const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const ruleRegex = /(\w+): (\d+)-(\d+) or (\d+)-(\d+)/

const getRules = ruleSection =>
  ruleSection.split('\n').reduce((acc, curr) => {
    const ruleParts = curr.match(ruleRegex)
    acc.push({
      name: ruleParts[1],
      ranges: [{
        low: Number(ruleParts[2]),
        high: Number(ruleParts[3])
      }, {
        low: Number(ruleParts[4]),
        high: Number(ruleParts[5])
      }]
    })
    return acc
  }, [])

const getTicket = ticketStr =>
  ticketStr.split(',').map(Number)

const getTickets = ticketSection => {
  const myTicketParts = ticketSection.split('\n')
  const ticketStrings = myTicketParts.slice(1)
  return ticketStrings.map(getTicket)
}

const between = (val, ruleRange) => val >= ruleRange.low && val <= ruleRange.high
const hasValidRange = (val, ranges) => ranges.reduce((acc, curr) => acc || between(val, curr), false)
const getAllRanges = rules => rules.reduce((acc, curr) => acc.concat(curr.ranges), [])
const getErrorRate = (tickets, rules) => {
  const ranges = getAllRanges(rules)
  return tickets.reduce((acc, ticket) =>
    acc + ticket.reduce((ticketAcc, ticketVal) =>
      hasValidRange(ticketVal, ranges)
        ? ticketAcc
        : ticketAcc + ticketVal
    , 0)
  , 0)
}

const ticketStuff = text.split('\n\n')
const rules = getRules(ticketStuff[0])
const myTicket = getTickets(ticketStuff[1]).flat()
const tickets = getTickets(ticketStuff[2])
const errRate = getErrorRate(tickets, rules)
console.log(`Error rate is ${errRate}`)

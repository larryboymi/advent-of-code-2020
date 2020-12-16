const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const ruleRegex = /(.*): (\d+)-(\d+) or (\d+)-(\d+)/

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
const hasValidRange = (ranges, val) => ranges.reduce((acc, curr) => acc || between(val, curr), false)
const ticketValid = ranges => ticket => ticket.reduce((acc, val) => acc && hasValidRange(ranges, val), true)
const eitherRange = (val, ranges) => between(val, ranges[0]) || between(val, ranges[1])
const getAllRanges = rules => rules.reduce((acc, curr) => acc.concat(curr.ranges), [])
const getErrorRate = (tickets, rules) => {
  const ranges = getAllRanges(rules)
  return tickets.reduce((acc, ticket) =>
    acc + ticket.reduce((ticketAcc, ticketVal) =>
      acc && hasValidRange(ticketVal, ranges), true)
  , 0)
}

const getPossibleFields = (rules, tickets) => {
  const ticketLength = tickets[0].length
  const validFields = new Array(ticketLength)
  const valuesByPos = []
  for (let i = 0; i < ticketLength; i++) {
    validFields[i] = []
    valuesByPos.push(tickets.map(ticket => ticket[i]))
  }

  for (let i = 0; i < valuesByPos.length; i++) {
    for (let j = 0; j < rules.length; j++) {
      const validForAll = valuesByPos[i].reduce((acc, curr) => acc && eitherRange(curr, rules[j].ranges), true)
      if (validForAll) {
        validFields[i].push(rules[j].name)
      }
    }
  }
  return validFields
}

const removeNonSingle = (possibilities, val) =>
  possibilities.map(arr => 
    arr.length > 1 && arr.includes(val)
      ? arr.filter(aVal => aVal !== val)
      : arr
  )
const getSingles = arrays => arrays.filter(arr => arr.length === 1).flat()
const allSingle = arr => arr.filter(innerArr => innerArr.length > 1).length === 0

const filterPossibilities = possibilities => {
  let oneField = getSingles(possibilities)
  let filtered = JSON.parse(JSON.stringify(possibilities))
  const fieldsComplete = []
  while (!allSingle(filtered)) {
    filtered = removeNonSingle(filtered, oneField[0])
    fieldsComplete.push(oneField[0])
    oneField = getSingles(filtered).filter(single => !fieldsComplete.includes(single))
  }
  return filtered.flat()
}

const ticketStuff = text.split('\n\n')
const rules = getRules(ticketStuff[0])
const myTicket = getTickets(ticketStuff[1]).flat()
const tickets = getTickets(ticketStuff[2])
const ranges = getAllRanges(rules)
const validTickets = tickets.filter(ticketValid(ranges))
const fieldPossibilities = getPossibleFields(rules, validTickets)
const filterPossible = filterPossibilities(fieldPossibilities)
const indexes = filterPossible.reduce((acc, curr, idx) => {
  if (curr.includes('departure')) {
    acc.push(idx)
  }
  return acc
}, [])
const departureProduct = indexes.reduce((acc, curr) => acc * myTicket[curr], 1)
console.log(`The departure product is ${departureProduct}`)
const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const contentRegex = /(\d) (.*) bag[s]?[.,]?/

const getContents = contents => {
  const matches = contents.match(contentRegex)
  return { [matches[2]] : Number(matches[1]) }
}

const parseRule = ruleInput => {
  const ruleParts = ruleInput.split(' bags contain ')
  const colorType = ruleParts[0]
  const contents = ruleParts[1].split(', ').filter(part => contentRegex.test(part)).map(getContents)
  return {
    [colorType]: contents
  }
}

const checkRule = (quantity, color, rule, rules) => {
  const hasRule = rule.find(ruleColor => ruleColor.hasOwnProperty(color))
  if (hasRule && hasRule[color] >= quantity) {
    return true
  }
  return rule.reduce((acc, curr) => {
    if (acc) {
      return true
    }
    return checkRule(quantity, color, rules[Object.keys(curr)[0]], rules)
  }, false)
}

const getCount = (rule, rules) =>
  rule.reduce((acc, curr) =>
    acc + Object.values(curr)[0] + Object.values(curr)[0] * getCount(rules[Object.keys(curr)[0]], rules)
  , 0)

const rules = Object.assign({}, ...text.split('\n').map(parseRule))
const totalAllowed = getCount(rules['shiny gold'], rules)

console.log(`The num allowed are ${totalAllowed}`)

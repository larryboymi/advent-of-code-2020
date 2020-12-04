const fs = require("fs")
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const goalTotal = 2020
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const getPassport = data => {
  const attributes = data.split(/[\n\s]+/)
  return attributes.reduce((acc, curr) => {
    const attribute = curr.split(':')
    acc[attribute[0]] = attribute[1]
    return acc
  } , {})
}

const validPassport = passport => requiredFields.every(field => Object.keys(passport).includes(field))

const passports = text.split('\n\n').map(getPassport)
const validity = passports.map(validPassport)
const totalValid = validity.reduce((acc, curr) => curr ? acc + 1: acc, 0)
console.log(`How many are valid? ${totalValid}`)
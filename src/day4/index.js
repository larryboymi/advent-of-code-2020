const fs = require('fs')
const text = fs.readFileSync('input.txt', { encoding: 'utf8' })
const goalTotal = 2020
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const getPassport = data => {
  const attributes = data.split(/[\n\s]+/)
  return attributes.reduce((acc, curr) => {
    const attribute = curr.split(':')
    acc[attribute[0]] = attribute[1].trim()
    return acc
  } , {})
}

const hasValidFields = passport => requiredFields.every(field => Object.keys(passport).includes(field))

const minMaxCheck = (min, max, value) => value && value >= min && value <= max
const getHeight = heightStr => {
  if (!heightStr) {
    return { min: null, max: null, value: null}
  }
  const heightParts = heightStr.match(/[^\d]+|\d+/g)
  if (heightParts[1] === 'cm') {
    return {
      min: 150,
      max: 193,
      value: Number(heightParts[0])
    }
  } else if (heightParts[1] === 'in') {
    return {
      min: 59,
      max: 76,
      value: Number(heightParts[0])
    }
  } else {
    return { min: null, max: null, value: null}
  }
}

const isValidEyeColor = color => validEyeColors.includes(color)

const isValidHairColor = color => {
  if (!color) {
    return false
  }
  const colorSegments = color.split('#')
  return colorSegments && colorSegments[1] && /^[a-f0-9]+$/.test(colorSegments[1])
}

const isValidPassportId = pid => pid && pid.length === 9 && !isNaN(pid) && !isNaN(parseFloat(pid))

const isValidPassport = passport => {
  if (!hasValidFields) {
    return false
  }
  const height = getHeight(passport.hgt)
  const validityChecks = [
    minMaxCheck(1920, 2002, Number(passport.byr)),
    minMaxCheck(2010, 2020, Number(passport.iyr)),
    minMaxCheck(2020, 2030, Number(passport.eyr)),
    minMaxCheck(2010, 2020, Number(passport.iyr)),
    minMaxCheck(height.min, height.max, height.value),
    isValidHairColor(passport.hcl),
    isValidEyeColor(passport.ecl),
    isValidPassportId(passport.pid)
  ]
  return validityChecks.reduce((acc, curr) => acc && curr, true)
}

const passports = text.split('\n\n').map(getPassport)
const validity = passports.map(isValidPassport)
const totalValid = validity.reduce((acc, curr) => curr ? acc + 1: acc, 0)
console.log(`How many are valid? ${totalValid}`)
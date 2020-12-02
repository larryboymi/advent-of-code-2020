
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const filePath = path.join(__dirname, 'input.txt')

const getPwd = line => {
  const lineSegments = line.split(': ')
  const policy = lineSegments[0]
  const password = lineSegments[1]
  const policySegments = policy.split(' ')
  const countSegments = policySegments[0].split('-')
  return {
    firstPosition: countSegments[0],
    secondPosition: countSegments[1],
    char: policySegments[1],
    password 
  }
}

const getPwdArray = async path => {
  const pwds = []
  try {
    const fileStream = fs.createReadStream(path)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    for await (const line of rl) {
      pwds.push(getPwd(line.trim()))
    }
    return pwds
  } catch( e) {
    console.error('Error reading file..', e);
  }
}

const isSingleOccurrence = ({password, char, firstPosition, secondPosition}) => {
  const firstPositionEqual = password[firstPosition-1] === char
  const secondPositionEqual = password[secondPosition-1] === char
  return !(firstPositionEqual && secondPositionEqual) &&
    !(!firstPositionEqual && !secondPositionEqual)
}


const numPassing = passwords =>
  passwords.reduce((acc, curr) => {
    //console.log(`There are ${occurrences} occurrences of ${curr.char} in ${curr.password}`)
    if (isSingleOccurrence(curr)) {
      return acc + 1
    }
    return acc
  }, 0)

const runDay = async () => {
  const passwords = await getPwdArray(filePath)
  //console.log(`passwords = ${JSON.stringify(passwords)}`)
  console.log(`The number of passwords compliant with policy is ${numPassing(passwords)}`)
}

runDay()
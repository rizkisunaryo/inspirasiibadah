import uuidv4 from 'uuid/v4'

export function generateId () {
  return uuidv4().split('-').join('').substr(0, 8)
}

export const zeroedNumber = (number, expectedLength) => {
  let numberStr = number
  if (typeof number === 'number') {
    numberStr = number.toString()
  }

  const numberLength = numberStr.length
  if (numberLength >= expectedLength) {
    return numberStr
  }

  for (let i = numberLength + 1; i <= expectedLength; i++) {
    numberStr = '0' + numberStr
  }
  return numberStr
}

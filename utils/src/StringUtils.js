import uuidv4 from 'uuid/v4'

export function generateId () {
  return uuidv4().split('-').join('').substr(0, 8)
}

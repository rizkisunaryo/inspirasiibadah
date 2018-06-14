export function getCookie (name) {
  if (!document) return undefined

  const cookieStr = decodeURIComponent(document.cookie)
  const cookieArr = cookieStr.split(';')

  let cookieValue
  const nameEqualSign = name + '='
  for (let key in cookieArr) {
    let cookie = cookieArr[key].trim()
    if (cookie.indexOf(nameEqualSign) > -1) {
      cookieValue = cookie.substring(nameEqualSign.length, cookie.length)
      break
    }
  }

  return cookieValue === 'undefined' ? undefined : cookieValue
}

export function setCookieForAYear (key, value) {
  if (!document) return

  let dat = new Date()
  dat.setFullYear(dat.getFullYear() + 1)

  document.cookie = `${key}=${value}; expires=${dat.toUTCString()}; path=/`
}

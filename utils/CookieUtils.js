export function getCookie (name) {
  if (!document) return undefined

  const cookieStr = decodeURIComponent(document.cookie)
  const cookieArr = cookieStr.split(';')

  let cookieValue = undefined
  const nameEqualSign = name + '='
  for (let key in cookieArr) {
    let cookie = cookieArr[key].trim()
    if (cookie.indexOf(nameEqualSign) > -1) {
      cookieValue = cookie.substring(nameEqualSign.length, cookie.length)
      break
    }
  }

  return cookieValue
}

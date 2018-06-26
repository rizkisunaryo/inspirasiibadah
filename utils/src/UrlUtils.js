export const generateUrlQuery = paramObj => {
  let queryArr = []
  Object.keys(paramObj).forEach(key => { queryArr.push(key + '=' + paramObj[key]) })
  return '?' + queryArr.join('&&')
}

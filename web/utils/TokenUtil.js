import {getCookie} from '../../utils/dist/CookieUtils'

export const tokenizer = theFunction => {
  return theFunction(getCookie('token'))
}

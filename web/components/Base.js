import {PureComponent} from 'react'
import {BACKEND_URL} from '../configs/Backend'
import {getCookie, setCookieForAYear} from '../../utils/CookieUtils'

export default class Base extends PureComponent {
  componentDidMount () {
    if (decodeURIComponent(document.cookie).indexOf('token') < 0 ||
      decodeURIComponent(document.cookie).indexOf('name') < 0) {
      fetch(BACKEND_URL + '/token')
        .then(resp => resp.json())
        .then(resp => {
          setCookieForAYear('name', resp.name)
          setCookieForAYear('token', resp.token)
        })
        .catch(err => console.log('error when getting token: ', err))
    } else {
      setCookieForAYear('name', getCookie('name'))
      setCookieForAYear('token', getCookie('token'))
    }
  }

  render () {
    return null
  }
}

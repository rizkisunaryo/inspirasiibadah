import {PureComponent} from 'react'
import {BACKEND_URL} from '../configs/Backend'
import {getCookie, setCookieForAYear} from '../../utils/CookieUtils'

export default class Base extends PureComponent {
  componentDidMount () {
    if (!process.browser) return

    if (!getCookie('token') || !getCookie('nama')) {
      fetch(BACKEND_URL + '/token')
        .then(resp => resp.json())
        .then(resp => {
          setCookieForAYear('nama', resp.nama)
          setCookieForAYear('token', resp.token)
        })
        .catch(err => console.log('error when getting token: ', err))
    } else {
      setCookieForAYear('nama', getCookie('nama'))
      setCookieForAYear('token', getCookie('token'))
    }
  }

  render () {
    return null
  }
}

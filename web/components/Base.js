import {PureComponent} from 'react'
import {BACKEND_URL} from '../configs/Backend'

export default class Base extends PureComponent {
  componentDidMount () {
    if (decodeURIComponent(document.cookie).indexOf('token') < 0) {
      fetch(BACKEND_URL + '/token')
        .then(resp => resp.json())
        .then(resp => {
          document.cookie = `name=${resp.name};`
          document.cookie = `token=${resp.token};`
        })
        .catch(err => console.log('error when getting token: ', err))
    }
  }

  render () {
    return null
  }
}

import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {initUser} from '../actions/userActions'

class Base extends PureComponent {
  componentDidMount () {
    if (!process.browser) return

    this.props.initUser()
  }

  render () {
    return null
  }
}

export default connect(state => ({}), {initUser})(Base)

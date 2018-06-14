import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {initUser} from '../actions/userActions'

class Base extends PureComponent {
  componentDidMount () {
    if (!process.browser) return

    this.props.initUser()
  }

  render () {
    if (this.props.loading) {
      return (
        <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src='/static/images/loading.svg' style={{width: 100, height: 100}} />
        </div>
      )
    }

    return null
  }
}

export default connect(state => ({loading: state.status.loading}), {initUser})(Base)

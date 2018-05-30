import {withRouter} from 'next/router'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import Base from '../components/Base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'
import store from '../store'

class Index extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <IndexConnect {...this.props} />
      </Provider>
    )
  }
}
export default withRouter(Index)

class IndexComponent extends PureComponent {
  render () {
    return (
      <div>
        <Base />
        <Headers />
        <BottomNavigationBar router={this.props.router} />
      </div>
    )
  }
}

const IndexConnect = connect(state => ({}), {})(IndexComponent)

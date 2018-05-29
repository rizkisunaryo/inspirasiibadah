import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import Base from '../components/Base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'
import store from '../store'

export default class Index extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <IndexConnect {...this.props} />
      </Provider>
    )
  }
}

class IndexComponent extends PureComponent {
  render () {
    return (
      <div>
        <Base />
        <Headers />
        <BottomNavigationBar url={this.props.url} />
      </div>
    )
  }
}

const IndexConnect = connect(state => ({}), {})(IndexComponent)

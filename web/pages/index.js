import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'
import store from '../store'
import {testAction} from '../actions/testAction'

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
  componentDidMount () {
    this.props.testAction(3, 1000)
  }

  render () {
    return (
      <div>
        <Headers />
        <BottomNavigationBar url={this.props.url} />
        {this.props.reduxTheNumber}
      </div>
    )
  }
}

const IndexConnect = connect(
  state => ({
    reduxTheNumber: state.testRedux.theNumber
  }),
  {
    testAction
  }
)(IndexComponent)

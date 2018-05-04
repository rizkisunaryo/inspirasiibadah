import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import Headers from '../components/Headers'
import store from '../store'
import {testAction} from '../actions/testAction'

export default class Coba extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <IndexConnect />
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
      </div>
    )
  }
}

const IndexConnect = connect(
  state => ({
    theNumber: state.testRedux.theNumber
  }),
  {
    testAction
  }
)(IndexComponent)

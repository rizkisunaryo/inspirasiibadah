import { PureComponent } from 'react'
import { connect, Provider } from 'react-redux'

import store from '../store'
import { testAction } from '../actions/testAction'

export default class Index extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <Coba />
      </Provider>
    )
  }
}

class CobaComponent extends PureComponent {
  componentDidMount () {
    this.props.testAction(3, 1000)
  }

  render () {
    return (
      <div>{this.props.theNumber}</div>
    )
  }
}

const Coba = connect(
  state => ({
    theNumber: state.testRedux.theNumber
  }),
  {
    testAction
  }
)(CobaComponent)

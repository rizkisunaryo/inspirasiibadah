import {Button, Paper} from 'material-ui'
import { PureComponent } from 'react'
import { connect, Provider } from 'react-redux'

import ImportMaterialUI from '../components/ImportMaterialUI'
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
      <Paper>
        <ImportMaterialUI />
        <Button>{this.props.theNumber}</Button>
      </Paper>
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

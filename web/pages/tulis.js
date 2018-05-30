import {withRouter} from 'next/router'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'
import TextField from '@material-ui/core/TextField'

import Base from '../components/Base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import {getCookie} from '../../utils/CookieUtils'
import Headers from '../components/Headers'
import store from '../store'

class Tulis extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <TulisConnect {...this.props} />
      </Provider>
    )
  }
}
export default withRouter(Tulis)

class TulisComponent extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {name: ''}
  }
  componentDidMount () {
    this.setState({name: getCookie('name')})
  }
  render () {
    return (
      <div style={{margin: '0 10px'}}>
        <Base />
        <Headers />
        <BottomNavigationBar router={this.props.router} />
        <TextField
          label='Nama'
          InputLabelProps={{
            shrink: true
          }}
          placeholder={this.state.name}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Judul'
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          margin='normal'
        />
      </div>
    )
  }
}

const TulisConnect = connect(state => ({}), {})(TulisComponent)

import Head from 'next/head'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'
import {actionCheckLogin} from '../actions/loginActions'
import store from '../store'

export default class Tulis extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <TulisConnect {...this.props} />
      </Provider>
    )
  }
}

class TulisComponent extends PureComponent {
  componentDidMount () {
    console.log('CROTERS 2: ', process.env.INSPIRASI_IBADAH_GOOGLE_CLIENT_ID)
    this.props.actionCheckLogin()
  }

  render () {
    return (
      <div>
        <Headers />
        <Head>
          <script src='https://apis.google.com/js/platform.js' async defer />
          <meta name='google-signin-client_id' content={process.env.INSPIRASI_IBADAH_GOOGLE_CLIENT_ID} />
        </Head>
        <BottomNavigationBar url={this.props.url} />
        {this.props.reduxLoginStatus === '' ? 'loading' : this.props.reduxLoginStatus}
      </div>
    )
  }
}

const TulisConnect = connect(
  state => ({
    reduxLoginStatus: state.login.status
  }),
  {
    actionCheckLogin
  }
)(TulisComponent)

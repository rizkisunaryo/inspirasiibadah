import Head from 'next/head'
import {withRouter} from 'next/router'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import Base from '../components/Base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'
import {actionCheckLogin} from '../actions/loginActions'
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
  componentDidMount () {
    this.props.actionCheckLogin()
  }

  render () {
    return (
      <div>
        <Base />
        <Headers />
        <Head>
          <script src='https://apis.google.com/js/platform.js' async defer />
          <meta name='google-signin-client_id' content={process.env.INSPIRASI_IBADAH_GOOGLE_CLIENT_ID} />
        </Head>
        <BottomNavigationBar router={this.props.router} />
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

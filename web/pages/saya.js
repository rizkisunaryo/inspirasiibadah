import {withRouter} from 'next/router'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import Base from '../components/Base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'
import KisahCard from '../components/KisahCard'
import store from '../store'

class Saya extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <SayaConnect {...this.props} />
      </Provider>
    )
  }
}
export default withRouter(Saya)

class SayaComponent extends PureComponent {
  render () {
    return (
      <div style={{padding: 10, height: 'calc(100% - 76px)', overflowY: 'scroll'}}>
        <Headers />
        <Base />
        <BottomNavigationBar router={this.props.router} />
        {this.props.kisahList.map(kisahObj =>
          <KisahCard key={kisahObj.id} nama={this.props.nama} {...kisahObj} />)}
      </div>
    )
  }
}

const SayaConnect = connect(state => ({
  kisahList: state.kisahListSaya.list,
  nama: state.user.nama
}), {})(SayaComponent)

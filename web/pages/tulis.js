import Icon from '@material-ui/core/Icon'
import {withRouter} from 'next/router'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'
import TextField from '@material-ui/core/TextField'

import Base from '../components/Base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Colors from '../configs/Colors'
import Headers from '../components/Headers'
import {createKisah} from '../actions/kisahActions'
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
  render () {
    return (
      <div style={{margin: '0 10px', height: '100%'}}>
        <Base />
        <Headers />
        <BottomNavigationBar router={this.props.router} />
        <TextField
          label='Nama'
          InputLabelProps={{
            shrink: true
          }}
          placeholder={this.props.nama}
          fullWidth
          margin='normal'
          onChange={({target}) => { this.valueNama = target.value }}
        />
        <TextField
          label='Judul'
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          margin='normal'
          onChange={({target}) => { this.valueJudul = target.value }}
        />
        <textarea
          style={{
            borderColor: Colors.GREY_500,
            borderWidth: 1,
            borderStyle: 'solid',
            width: 'calc(100% - 12px)',
            marginTop: 10,
            padding: 5,
            height: 'calc(100% - 270px)'
          }}
          placeholder='Apa kisahmu?'
          onChange={({target}) => { this.valueKisah = target.value }} />
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5
          }}>
          <button
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor:
              Colors.BLUE_300,
              color: 'white',
              alignItems: 'center'
            }}
            onClick={() => this.props.createKisah(this.valueNama, this.valueJudul, this.valueKisah)} >
            <div style={{fontSize: 14, marginRight: 5}}>SEND</div>
            <Icon>send</Icon>
          </button>
        </div>
      </div>
    )
  }
}

const TulisConnect = connect(state => ({nama: state.user.nama}), {createKisah})(TulisComponent)

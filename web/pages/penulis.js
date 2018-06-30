import lodashGet from 'lodash/get'
import {withRouter} from 'next/router'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'

import Base from '../components/Base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'
import {listKisahPenulisAction} from '../actions/kisahActions'
import KisahCard from '../components/KisahCard'
import store from '../store'

class Penulis extends PureComponent {
  static getInitialProps ({query: {penulisId}}) {
    return {penulisId}
  }

  render () {
    return (
      <Provider store={store}>
        <PenulisConnect {...this.props} />
      </Provider>
    )
  }
}
export default withRouter(Penulis)

class PenulisComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.listKisahIfEmpty = this.listKisahIfEmpty.bind(this)
  }

  componentDidMount () {
    this.listKisahIfEmpty()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.penulisId !== this.props.penulisId) {
      this.listKisahIfEmpty()
    }
  }

  listKisahIfEmpty () {
    if (this.props.kisahList.length < 1) {
      this.props.listKisahPenulisAction(lodashGet(this.props, 'penulisId', ''))
    }
  }

  render () {
    return (
      <div style={{padding: 10, height: 'calc(100% - 76px)', overflowY: 'scroll'}}>
        <Headers />
        <Base />
        <BottomNavigationBar router={this.props.router} />
        {this.props.kisahList.map(kisahObj =>
          <KisahCard key={kisahObj.id} {...kisahObj} />)}
        {this.props.loadingBottom &&
          <div style={{width: '100%', textAlign: 'center'}}>
            <img src='/static/images/loading.svg' style={{width: 50, height: 50}} />
          </div>
        }
      </div>
    )
  }
}

const PenulisConnect = connect((state, ownProps) => {
  const penulisId = lodashGet(ownProps, 'penulisId', '')
  return {
    kisahList: lodashGet(state, `['kisahListPenulis${penulisId}'].list`, []),
    loadingBottom: lodashGet(state, `['kisahListPenulis${penulisId}'].loadingBottom`, false)
  }
}, {listKisahPenulisAction})(PenulisComponent)

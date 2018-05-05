import {PureComponent} from 'react'

import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'

export default class Tulis extends PureComponent {
  componentDidMount () {
    console.log('CROTERS 2: ', process.env.INSPIRASI_IBADAH_GOOGLE_CLIENT_ID)
  }

  render () {
    return (
      <div>
        <Headers />
        <BottomNavigationBar url={this.props.url} />
        tulis
      </div>
    )
  }
}

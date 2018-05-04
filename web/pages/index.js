import {PureComponent} from 'react'

import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'

export default class Index extends PureComponent {
  render () {
    return (
      <div>
        <Headers />
        <BottomNavigationBar />
      </div>
    )
  }
}

import {PureComponent} from 'react'

import BottomNavigationBar from '../components/BottomNavigationBar'
import Headers from '../components/Headers'

export default class Tulis extends PureComponent {
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

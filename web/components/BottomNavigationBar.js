import Link from 'next/link'
import {PureComponent} from 'react'

import Colors from '../configs/Colors'
import MaterialIcon from '../components/MaterialIcon'

export default class BottomNavigationBar extends PureComponent {
  render () {
    const {
      url: propUrl
    } = this.props

    const styles = {
      navigationButtonContainer: {
        display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'
      }
    }

    return (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          height: 56,
          justifyContent: 'center',
          backgroundColor: Colors.BLUE_300
        }}>
        <div style={{width: 480, height: '100%', display: 'flex', flexDirection: 'row'}}>
          <div style={styles.navigationButtonContainer}>
            <Link href='/'>
              <MaterialIcon
                active={propUrl && ['/', '/index'].indexOf(propUrl.pathname) > -1}
                type='home'
                label='Home' />
            </Link>
          </div>
          <div style={styles.navigationButtonContainer}>
            <Link href='/cari'>
              <MaterialIcon
                active={propUrl && ['/cari'].indexOf(propUrl.pathname) > -1}
                type='search'
                label='Cari' />
            </Link>
          </div>
          <div style={styles.navigationButtonContainer}>
            <Link href='/tulis'>
              <MaterialIcon
                active={propUrl && ['/tulis'].indexOf(propUrl.pathname) > -1}
                type='add_circle'
                label='Tulis' />
            </Link>
          </div>
          <div style={styles.navigationButtonContainer}>
            <Link href='/saya'>
              <MaterialIcon
                active={propUrl && ['/saya'].indexOf(propUrl.pathname) > -1}
                type='perm_identity'
                label='Saya' />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

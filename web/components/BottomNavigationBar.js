import {PureComponent} from 'react'

import Colors from '../configs/Colors'
import MaterialIcon from '../components/MaterialIcon'

export default class BottomNavigationBar extends PureComponent {
  render () {
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
            <MaterialIcon active type='home' label='Home' />
          </div>
          <div style={styles.navigationButtonContainer}>
            <MaterialIcon type='search' label='Cari' />
          </div>
          <div style={styles.navigationButtonContainer}>
            <MaterialIcon type='add_circle' label='Tulis' />
          </div>
          <div style={styles.navigationButtonContainer}>
            <MaterialIcon type='perm_identity' label='Saya' />
          </div>
        </div>
      </div>
    )
  }
}

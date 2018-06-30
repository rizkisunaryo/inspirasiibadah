import {PureComponent} from 'react'

import Colors from '../../utils/dist/constants/Colors'
import {gmtToIndonesia} from '../../utils/dist/DateUtils'

export default class KisahCard extends PureComponent {
  render () {
    const {
      penulisNama,
      updatedAt,
      judul,
      kisah
    } = this.props

    return (
      <div
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: Colors.GREY_500,
          borderStyle: 'solid',
          marginBottom: 7
        }}
      >
        <div style={{marginBottom: 7}}>
          <div style={{color: Colors.BLUE_500, marginBottom: 3}}>
            {penulisNama}
          </div>
          <div style={{fontSize: 12}}>{gmtToIndonesia(updatedAt)}</div>
        </div>
        <div style={{fontSize: 19, fontWeight: 'bold', marginBottom: 7}}>
          {judul}
        </div>
        <div style={{color: Colors.GREY_700}}>
          {kisah}
        </div>
      </div>
    )
  }
}

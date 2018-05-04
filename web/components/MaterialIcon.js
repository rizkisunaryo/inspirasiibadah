import {PureComponent} from 'react'

import Colors from '../configs/Colors'

export default class MaterialIcon extends PureComponent {
  render () {
    const {
      active: propActive,
      label: propLabel,
      type: propType
    } = this.props

    const color = propActive ? Colors.GREY_50 : Colors.GREY_300

    return (
      <div style={{display: 'flex', flexDirection: 'column', width: 80, alignItems: 'center'}}>
        <i
          className='material-icons'
          style={{fontSize: 24, color}}>{propType}</i>
        {propLabel && propActive &&
          <div style={{fontFamily: 'Roboto', color, fontSize: 14}}>{propLabel}</div>}
      </div>
    )
  }
}

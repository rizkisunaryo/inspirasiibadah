import {PureComponent} from 'react'

import Colors from '../../utils/dist/constants/Colors'

export default class MaterialIcon extends PureComponent {
  render () {
    const {
      active: propActive,
      label: propLabel,
      onClick: propOnClick,
      type: propType
    } = this.props

    const color = propActive ? Colors.GREY_50 : Colors.GREY_300

    return (
      <div
        onClick={propOnClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 80,
          alignItems: 'center',
          cursor: 'pointer'
        }}>
        <i
          className='material-icons'
          style={{fontSize: 24, color}}>{propType}</i>
        {propLabel && propActive &&
          <div style={{fontFamily: 'Roboto', color, fontSize: 14}}>{propLabel}</div>}
      </div>
    )
  }
}

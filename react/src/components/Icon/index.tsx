import React from 'react'
import theme from '../theme'
import CloseIcon from './Close'
import SunIcon from './Sun'

type Props = {
  type: string
  color?: string
}

const Icon = ({ type, color }: Props): JSX.Element => {
  const iconColor = color || theme.color.base
  if (type === 'sun') {
    return <SunIcon color={iconColor} />
  } else if (type === 'close') {
    return <CloseIcon color={iconColor} />
  } else {
    return <i></i>
  }
}

export default Icon

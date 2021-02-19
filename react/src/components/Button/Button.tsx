import React from 'react'
import styled from '@emotion/styled'

type Props = {
  children: JSX.Element
  onClick: () => void
}

const Button = ({ children, onClick }: Props): JSX.Element => <StyledButton onClick={onClick}>{children}</StyledButton>

export default Button

const StyledButton = styled('button')`
  padding: 1em;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
`

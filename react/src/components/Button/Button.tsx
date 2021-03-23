import React, { ReactChild } from 'react'
import styled from '@emotion/styled'

type Props = {
  children: ReactChild | ReactChild[]
  padding?: string
  onClick: () => void
}

const Button = ({ children, onClick, ...props }: Props): JSX.Element => (
  <StyledButton onClick={onClick} {...props}>
    {children}
  </StyledButton>
)

export default Button

const StyledButton = styled('button')<Props>`
  padding: ${({ padding }: Props) => `${padding}rem` || '1rem'};
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
`

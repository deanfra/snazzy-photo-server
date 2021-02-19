import React from 'react'
import styled from '@emotion/styled'

type Props = {
  align?: string
  children: JSX.Element | JSX.Element[] | string | string[]
  direction?: string
  flex?: string
  grow?: boolean
  justify?: string
  width?: string
}

const Flex = ({ children, ...props }: Props): JSX.Element => <StyledFlex {...props}>{children}</StyledFlex>

export default Flex

const StyledFlex = styled('div')<Props>`
  display: flex;
  flex: ${({ flex, grow }) => flex || (grow ? 1 : 0)};
  flex-direction: ${({ direction }) => direction || 'column'};
  align-items: ${({ align }) => align || 'flex-start'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  width: ${({ width }) => width || 'auto'};
`

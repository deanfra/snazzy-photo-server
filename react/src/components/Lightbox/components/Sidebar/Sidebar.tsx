import React from 'react'
import styled from '@emotion/styled'
import Flex from 'components/Flex'

type Props = {
  children: JSX.Element | JSX.Element[]
  direction?: string
}

const Sidebar = ({ children, ...props }: Props): JSX.Element => (
  <StyledSidebar flex="0 20rem" {...props}>
    {children}
  </StyledSidebar>
)

export default Sidebar

const StyledSidebar = styled(Flex)<Props>`
  position: fixed;
  height: calc(100vh - 2rem);
  margin: 1rem;
  right: 0;
  width: 20rem;
  z-index: 3;
`

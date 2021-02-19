import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import Flex from '../Flex'
import Icon from '../Icon'

const Loader = (): JSX.Element => (
  <StyledLoader grow>
    <Spinner>
      <Icon type="sun" />
    </Spinner>
  </StyledLoader>
)

export default Loader

const rotate360 = keyframes(`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`)

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  width: 1.5rem;
  height: 1.5rem;
`

const StyledLoader = styled(Flex)`
  margin: 5em auto;
  align-items: center;
`

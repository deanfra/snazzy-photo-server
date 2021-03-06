import React from 'react'
import styled from '@emotion/styled'
import Flex from 'components/Flex'
import Button from 'components/Button'
import Icon from 'components/Icon'
import SidebarExif from './components/SidebarExif'
import Image from 'interfaces/Image'

type Props = {
  close: (show: boolean) => void
  imageDetails?: Image
}

const Sidebar = ({ close, imageDetails }: Props): JSX.Element => (
  <StyledSidebar flex="0 20rem">
    <Flex align="flex-end" width="100%">
      <Button padding="0.5" onClick={() => close(false)}>
        <Icon type="close" />
      </Button>
    </Flex>
    {imageDetails ? (
      <StyledSidebarInner>
        <Flex>
          <p><strong>Path:</strong> {imageDetails.path.replace('/images/', '')}</p>
        </Flex>
        <SidebarExif exif={imageDetails.exif} />
      </StyledSidebarInner>
    ) : <p/>}
  </StyledSidebar>
)

export default Sidebar

const StyledSidebar = styled(Flex)`
  position: fixed;
  height: calc(100vh - 2rem);
  margin: 1rem;
  right: 0;
  width: 20rem;
  z-index: 3;
`
const StyledSidebarInner = styled(Flex)`
  position: fixed;
  height: calc(100vh - 4.5rem);
  margin: 3rem 1rem 1rem;
  right: 0;
  width: 20rem;
  overflow-y: auto;
  z-index: 3;

`

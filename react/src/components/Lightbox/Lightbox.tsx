import { Image } from '../../interfaces'
import Button from '../Button'
import Flex from '../Flex'
import Icon from '../Icon/'
import React from 'react'
import Sidebar from './components/Sidebar'
import styled from '@emotion/styled'
import theme from '../theme'

type Props = {
  image?: Image
  show: boolean
  toggle: (show: boolean) => void
}
const Lightbox = ({ image, show, toggle }: Props): JSX.Element => (
  <Wrapper show={show}>
    <Flex direction="row">
      <ImageWrapper grow width="100vw">
        <Image src={image?.path} />
      </ImageWrapper>
      <Sidebar>
        <Flex align="flex-end" width="100%">
          <Button onClick={() => toggle(false)}>
            <Icon type="close" />
          </Button>
        </Flex>
        <Flex>{image ? image.path.replace('/images/', '') : ''}</Flex>
      </Sidebar>
    </Flex>
  </Wrapper>
)

export default Lightbox

const Wrapper = styled('div')<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.show ? 'block' : 'none')};
`

const ImageWrapper = styled(Flex)`
  background: ${theme.color.eggshell};
`

const Image = styled('img')`
  width: calc(100vw - 23rem);
  margin: 1rem;
`

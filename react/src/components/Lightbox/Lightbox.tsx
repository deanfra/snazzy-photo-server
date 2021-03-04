import React, { useEffect, useState } from 'react'
import { Image } from '../../interfaces'
import Button from '../Button'
import Flex from '../Flex'
import Icon from '../Icon/'
import Sidebar from './components/Sidebar'
import styled from '@emotion/styled'
import theme from '../theme'
import Loader from '../Loader'

type Props = {
  image?: Image
  show: boolean
  toggle: (show: boolean) => void
}
const Lightbox = ({ image, show, toggle }: Props): JSX.Element => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (image) {
      setLoading(true)
      fetch(`/image/${image.id}`)
        .then((res) => res.json())
        .then((res) => console.log(res))
        .finally(() => { setLoading(false) })
    }
  }, [image])

  return (
    <Wrapper data-testid="lightbox-wrapper" show={show}>
      <Flex direction="row">
        <ImageWrapper data-testid="image-wrapper" grow width="100vw">
          { loading ? <Loader /> : <Image src={image?.path} />}
        </ImageWrapper>
        <Sidebar data-testid="sidebar" >
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
}

export default Lightbox

const Wrapper = styled('div')<{ show: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  position: fixed;
  display: ${(props) => (props.show ? 'block' : 'none')};
`

const ImageWrapper = styled(Flex)`
  background: ${theme.color.eggshell};
  height: auto;
  min-height: 100vh;
`

const Image = styled('img')`
  width: calc(100vw - 23rem);
  margin: 1rem;
`

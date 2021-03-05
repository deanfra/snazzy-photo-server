import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/Button'
import Flex from 'components/Flex'
import Icon from 'components/Icon/'
import Image from 'interfaces/Image'
import Loader from 'components/Loader'
import Sidebar from './components/Sidebar'
import SidebarExif from './components/SidebarExif'
import theme from 'components/theme'

type Props = {
  image?: Image
  show: boolean
  toggle: (show: boolean) => void
}
const Lightbox = ({ image, show, toggle }: Props): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [imageDetails, setImageDetails] = useState<Image>()

  useEffect(() => {
    if (image) {
      setLoading(true)
      fetch(`/image/${image.id}`)
        .then((res) => res.json())
        .then((res: Image) => setImageDetails(res))
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
          {imageDetails ? (
            <>
              <Flex>{imageDetails.path.replace('/images/', '')}</Flex>
              <SidebarExif exif={imageDetails.exif} />
            </>
          ) : <p/>}
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

import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Flex from 'components/Flex'
import Image from 'interfaces/Image'
import Loader from 'components/Loader'
import Sidebar from 'components/Lightbox/components/Sidebar'
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
    setImageDetails(undefined)
    if (image) {
      setLoading(true)
      fetch(`/image/${image.id}`)
        .then((res) => res.json())
        .then((res: Image) => setImageDetails(res))
        .finally(() => {
          setLoading(false)
        })
    }
  }, [image])

  return (
    <Wrapper data-testid="lightbox-wrapper" show={show}>
      <Flex direction="row">
        <ImageWrapper data-testid="image-wrapper" grow width="100vw">
          {loading ? <Loader /> : <Image src={image?.path} />}
        </ImageWrapper>
        <Sidebar data-testid="sidebar" close={toggle} imageDetails={imageDetails} />
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

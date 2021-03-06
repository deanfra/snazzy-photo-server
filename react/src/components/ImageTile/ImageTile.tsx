import React from 'react'
import styled from '@emotion/styled'
import Image from 'interfaces/Image'
import theme from 'components/theme'

type Props = {
  image: Image
  setSelectedImage: (image: Image) => void
}

const ImageTile = ({ image, setSelectedImage }: Props): JSX.Element => (
  <Tile key={image.id}>
    <Link
      tabIndex={0}
      onKeyUp={(e) => {e.keyCode === 13 ? setSelectedImage(image) : false}}
      onClick={() => setSelectedImage(image)}>
      <img src={image.thumb} />
    </Link>
  </Tile>
)

export default ImageTile

const Tile = styled('div')`
  margin: 20px;
  cursor: pointer;
`

const Link = styled('a')`
  border: 1px solid transparent;
  &:focus,
  &:hover {
    outline-color: ${theme.color.blackCoral};
  }
`

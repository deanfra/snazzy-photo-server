import React from 'react'
import styled from '@emotion/styled'
import Image from 'interfaces/Image'

type Props = {
  image: Image
  setSelectedImage: (image: Image) => void
}

const ImageTile = ({ image, setSelectedImage }: Props): JSX.Element => (
  <Tile key={image.id}>
    <a onClick={() => setSelectedImage(image)} href="#">
      <img src={image.thumb} />
    </a>
  </Tile>
)

export default ImageTile

const Tile = styled('div')`
  margin: 20px;
`

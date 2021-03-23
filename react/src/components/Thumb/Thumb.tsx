import React from 'react'
import styled from '@emotion/styled'
import Image from 'interfaces/Image'
import theme from 'components/theme'

type Props = {
  image: Image
  onClick: (image: Image) => void
}

const Thumb = ({ image, onClick }: Props): JSX.Element => (
  <StyledThumb key={image.id}>
    <Link
      tabIndex={0}
      onKeyUp={(e) => {
        e.keyCode === 13 ? onClick(image) : false
      }}
      onClick={() => onClick(image)}
    >
      <img src={image.thumb} />
    </Link>
  </StyledThumb>
)

export default Thumb

const StyledThumb = styled('div')`
  margin: 20px;
  cursor: pointer;
`

const Link = styled('a')`
  border: 2px solid ${theme.color.eggshell};
  width: 150px;
  height: 150px;
  display: inline-block;
  &:focus,
  &:hover {
    border-color: ${theme.color.melon};
    outline-color: ${theme.color.blackCoral};
  }
`

import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import styled from '@emotion/styled'
import Loader from 'components/Loader'
import Image from 'interfaces/Image'
import Thumb from 'components/Thumb'
import Pagination from 'components/Pagination'

type Props = {
  images: Image[]
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  selectedImage: Image | undefined
  setSelectedImage: Dispatch<SetStateAction<Image | undefined>>
  setShowLightBox: Dispatch<SetStateAction<boolean>>
}

const Gallery = ({images, pageSize, setPageSize, selectedImage, setSelectedImage, setShowLightBox}: Props): JSX.Element => {

  const w = window as any
  w.onkeyup = (({code}: KeyboardEvent) => {
    switch (code) {
      case 'ArrowRight':
        nextImage(images, 1, selectedImage)
        break;
      case 'ArrowLeft':
        nextImage(images, -1, selectedImage)
        break;
      case 'Escape':
        setSelectedImage(undefined);
        setShowLightBox(false);
        break;
    }
  })

  const nextImage = (images: Image[], increment:number, selectedImage?: Image): void => {
    if(selectedImage) {
      setSelectedImage(imageIncrement(increment, selectedImage, images))
    }
  }

  const imageIncrement = (increment: number, selectedImage: Image, images: Image[]): Image => {
    const currentIndex = images.indexOf(selectedImage)
    return images[currentIndex + increment] || images[currentIndex]
  }

  return <div>
    {!images.length
      ? <Loader />
      : (<>
          <ThumbsWrapper>
            {images.map((image) => <Thumb key={`thumb-${image.id}`} image={image} onClick={setSelectedImage} />)}
          </ThumbsWrapper>
          <Pagination pageSize={pageSize} setPageSize={setPageSize} />
        </>)
    }
  </div>
  
}

export default Gallery

const ThumbsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

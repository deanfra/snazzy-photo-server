import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Header from 'components/Header'
import Thumb from 'components/Thumb'
import Lightbox from 'components/Lightbox'
import Loader from 'components/Loader'
import Image from 'interfaces/Image'

const App = (): JSX.Element => {
  const [images, setImages] = useState<Image[]>([])
  const [showLightbox, setShowLightBox] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<Image>()

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

  useEffect(() => {
    fetch('/images')
      .then((res) => res.json())
      .then(setImages)
  }, [])

  useEffect(() => {
    if (selectedImage) {
      setShowLightBox(true)
    }
  }, [selectedImage])

  useEffect(() => {
    if (!showLightbox) {
      setSelectedImage(undefined)
    }
  }, [showLightbox])

  return (
    <div>
      <Header />
      <Lightbox show={showLightbox} image={selectedImage} toggle={setShowLightBox} />
      {!images.length ? <Loader /> : <Thumbs>{images.map((image) => <Thumb image={image} onClick={setSelectedImage} />)}</Thumbs>}
    </div>
  )
}

const Thumbs = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default App

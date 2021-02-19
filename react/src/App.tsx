import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ImageTile from './components/ImageTile'
import Lightbox from './components/Lightbox'
import Loader from './components/Loader'
import { Image } from './interfaces'

const App = (): JSX.Element => {
  const [images, setImages] = useState<Image[]>([])
  const [showLightbox, setShowLightBox] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<Image>()

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
      {!images.length ? <Loader /> : <Tiles>{images.map((image) => ImageTile({ image, setSelectedImage }))}</Tiles>}
    </div>
  )
}

const Tiles = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default App

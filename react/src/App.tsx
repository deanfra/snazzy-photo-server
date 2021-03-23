import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import Lightbox from 'components/Lightbox'
import Image from 'interfaces/Image'
import Gallery from 'components/Gallery'

const App = (): JSX.Element => {
  const [images, setImages] = useState<Image[]>([])
  const [showLightbox, setShowLightBox] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<Image | undefined>()
  const [page] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)

  useEffect(() => {
    const currentPage = page * pageSize
    fetch(`/images?offset=${currentPage}&page_size=${pageSize}`)
      .then((res) => res.json())
      .then((loadedImages) => {
        console.log(loadedImages)
        return loadedImages
      })
      .then((loadedImages) => setImages(loadedImages))
  }, [pageSize])

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
      <Gallery
        images={images}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedImage={selectedImage}
        setShowLightBox={setShowLightBox}
        setSelectedImage={setSelectedImage}
      />
    </div>
  )
}
export default App

import ImageExif from './ImageExif'

interface Image {
  id: string // uuid
  createdDate: string
  path: string // image path on server
  thumb: string // thumbnail path on server
  exif: ImageExif
}

export default Image

import ImageExif from '../interfaces/ImageExif'
import { statSync } from 'fs'
import models from '../models/'

type ImageProps = { base: string; path: string; file: Buffer; uuid: string; exif: ImageExif; thumb: string }
type ImageWithAlbums = ImageProps & { albums: string[]; createdDate: string }

const getCreateDate = ({ path, exif }: ImageProps): string => {
  const { birthtime } = statSync(path)
  return exif.CreateDate || birthtime.toISOString()
}

const imageTagger = (image: ImageProps): ImageWithAlbums => {
  const imageDate = new Date(getCreateDate(image))
  const monthName = imageDate.toLocaleString('default', { month: 'long' })
  const yearName = imageDate.getFullYear().toString()

  const year = models.album.insert({ name: yearName })
  const month = models.album.insert({ name: monthName, order: imageDate.getMonth(), parentId: year.id })

  return { albums: [month.id], createdDate: imageDate.toISOString(), ...image }
}

export default imageTagger

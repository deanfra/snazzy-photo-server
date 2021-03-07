import Image from '../interfaces/Image'
import ImageRow from '../interfaces/ImageRow'
import { fetchPhotoById, fetchPhotos as fetchAllPhotos } from '../models/image'
import imageMetaExifr from '../util/imageMetaExifr'
import imageReader from '../util/imageReader'

export const fetchPhoto = async (id: string, dir: string): Promise<Image> => {
  const { path, ...rest } = await fetchPhotoById(id)
  const fullPath = dir + path.replace('images/', '')

  const file = imageReader(fullPath)
  const exif = await imageMetaExifr(file)

  return { path, exif, ...rest }
}

export const fetchPhotos = async (offset: number | undefined, pageSize: number | undefined): Promise<ImageRow[]> => {
  const photos = await fetchAllPhotos(offset, pageSize)
  return photos
}

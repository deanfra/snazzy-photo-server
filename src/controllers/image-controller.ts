import Image from '../interfaces/Image'
import { fetchPhotoById } from '../models/image'
import imageMetaExifr from '../util/imageMetaExifr'
import imageReader from '../util/imageReader'

export const fetchPhoto = async (id: string, dir: string): Promise<Image> => {
  const { path, thumb } = await fetchPhotoById(id)
  const fullPath = dir + path.replace('images/', '')

  const file = imageReader(fullPath)
  const exif = await imageMetaExifr(file)

  return { id, path, thumb, exif }
}

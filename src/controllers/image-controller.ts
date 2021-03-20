import Image from '../interfaces/Image'
import ImageRow from '../interfaces/ImageRow'
import model from '../models/'
import imageMetaExifr from '../util/imageMetaExifr'
import imageReader from '../util/imageReader'

export const fetchPhoto = async (id: string, dir: string): Promise<Image> => {
  const { path, ...rest } = await model.image.fetchById(id)
  const fullPath = dir + path.replace('images/', '')

  const file = imageReader(fullPath)
  const exif = await imageMetaExifr(file)

  return { path, exif, ...rest }
}

export const fetchPhotos = async (offset: number | undefined, pageSize: number | undefined): Promise<ImageRow[]> => {
  const photos = await model.image.fetch(offset, pageSize)
  const albumIds = photos.map((photo) => photo.albums)

  console.log(albumIds)
  console.log(albumIds.filter((v, i, a) => a.indexOf(v) === i))

  return photos
}

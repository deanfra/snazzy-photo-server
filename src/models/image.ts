import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import ImageExif from '../interfaces/ImageExif'
import ImageRow from '../interfaces/ImageRow'

// Extract to a helper
const db = low(new FileSync('./src/models/db.json')).defaults({
  folders: [],
  photos: [],
  tags: [],
  people: [],
}) as any

const model = () => db.get('photos')

type ImageProps = { base: string; path: string; file: Buffer; uuid: string; thumb: string; exif: ImageExif }

export const insertPhoto = async ({ base, uuid, path, thumb }: ImageProps): Promise<ImageRow> => {
  const handle = model()
  const relativePath = path.replace(base, '/images')
  const data: ImageRow = { id: uuid, path: relativePath, thumb }
  let image

  if (!fetchPhotoById(uuid)) {
    image = await handle.push(data).write()
  } else {
    image = await handle.find({ id: uuid }).assign(data).write()
  }

  return image
}
export const fetchPhotos = (): Promise<ImageRow[]> => model().value()
export const fetchPhotoById = (id: string): Promise<ImageRow> => model().find({ id }).value()
export const fetchPhotoByPath = (path: string): Promise<ImageRow> => model().find({ path }).value()

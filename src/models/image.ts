import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import Image from '../interfaces/image'

const db = low(new FileSync('./src/models/db.json')).defaults({
  folders: [],
  photos: [],
  tags: [],
  people: [],
}) as any

const model = () => db.get('photos')

type ImageProps = { base: string; path: string; file: Buffer; uuid: string; thumb: string; exif: any; meta: any }

export const insertPhoto = async ({ base, uuid, path, thumb }: ImageProps): Promise<void> => {
  const handle = model()
  const relativePath = path.replace(base, '/images')
  const data = { id: uuid, path: relativePath, thumb }

  if (!fetchPhotoById(uuid)) {
    await handle.push(data).write()
  } else {
    await handle.find({ id: uuid }).assign(data).write()
  }

  // if (!fetchPhotoById(uuid)) {
  //   model().push({ id: uuid, path, thumb }).write()
  // }
}
export const fetchPhotos = () => model().value()
export const fetchPhotoById = (id: string): Promise<Image> => model().find({ id }).value()
export const fetchPhotoByPath = (path: string): Promise<Image> => model().find({ path }).value()

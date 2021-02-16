import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const db = low(new FileSync('./src/models/db.json')).defaults({
  folders: [],
  photos: [],
  tags: [],
  people: [],
}) as any

const model = () => db.get('photos')

export const insertPhoto = (baseDir: string, uuid: string, imgPath: string, thumb: string) => {
  const handle = model()
  const relativePath = imgPath.replace(baseDir, '/images')
  const data = { id: uuid, path: relativePath, thumb }

  if (!fetchPhotoById(uuid)) {
    handle.push(data).write()
  } else {
    handle.find({ id: uuid }).assign(data).write()
  }

  // if (!fetchPhotoById(uuid)) {
  //   model().push({ id: uuid, path, thumb }).write()
  // }
}
export const fetchPhotos = () => model().value()
export const fetchPhotoById = (id: string) => model().find({ id }).value()
export const fetchPhotoByPath = (path: string) => model().find({ path }).value()

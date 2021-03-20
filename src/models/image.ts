import { LowDB, LowDBModel } from '../custom'
import ImageExif from '../interfaces/ImageExif'
import ImageRow from '../interfaces/ImageRow'

type ImageProps = {
  albums: string[]
  base: string
  createdDate: string
  exif: ImageExif
  file: Buffer
  path: string
  thumb: string
  uuid: string
}

const insertImage = (model: any) => async ({ base, uuid, path, thumb, createdDate }: ImageProps): Promise<ImageRow> => {
  // refactor: move to controller
  const relativePath = path.replace(base, '/images')
  const data: ImageRow = {
    id: uuid,
    path: relativePath,
    thumb,
    createdDate,
    // imageCreatedDate
    // updatedDate: new Date().toISOString(),
  }

  if (!fetchImageById(model)(uuid)) {
    return await model.push(data).write()
  } else {
    return await model.find({ id: uuid }).assign(data).write()
  }
}
const fetchImages = (model: LowDBModel<ImageRow[]>) => (offset = 0, pageSize = 50): Promise<ImageRow[]> =>
  model.slice(offset, offset + pageSize).value()
const fetchImageById = (model: LowDBModel<ImageRow>) => (id: string): Promise<ImageRow> => model.find({ id }).value()
const fetchImageByName = (model: LowDBModel<ImageRow>) => (path: string): Promise<ImageRow> =>
  model.find({ path }).value()

export default (db: LowDB) => {
  const model = db.get('photos')

  const insert = insertImage(model)
  const fetch = fetchImages(model)
  const fetchById = fetchImageById(model)
  const fetchByName = fetchImageByName(model)

  return { insert, fetch, fetchById, fetchByName }
}

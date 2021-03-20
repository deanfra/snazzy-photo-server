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

const insertImage = (model: LowDBModel<ImageRow>) => async ({
  base,
  uuid,
  path,
  thumb,
  albums,
  createdDate,
}: ImageProps): Promise<ImageRow> => {
  // refactor: move to controller
  const relativePath = path.replace(base, '/images')
  const data: ImageRow = {
    id: uuid,
    path: relativePath,
    thumb,
    createdDate,
    albums,
    // imageCreatedDate
    // updatedDate: new Date().toISOString(),
  }

  const existing = fetchImageById(model)(uuid)

  if (!existing) {
    model.push(data).write()
  } else {
    model.find({ id: uuid }).assign(data).write()
  }

  return data
}
const fetchImages = (model: LowDBModel<ImageRow[]>) => (offset = 0, pageSize = 50): ImageRow[] =>
  model.slice(offset, offset + pageSize).value()
const fetchImageById = (model: LowDBModel<ImageRow>) => (id: string): ImageRow => model.find({ id }).value()
const fetchImageByName = (model: LowDBModel<ImageRow>) => (path: string): ImageRow => model.find({ path }).value()

export default (db: LowDB) => {
  const model = db.get('photos')

  const insert = insertImage(model)
  const fetch = fetchImages(model)
  const fetchById = fetchImageById(model)
  const fetchByName = fetchImageByName(model)

  return { insert, fetch, fetchById, fetchByName }
}

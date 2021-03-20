import { v4 as uuidv4 } from 'uuid'
import { LowDB, LowDBModel } from '../custom'
import AlbumRow from '../interfaces/AlbumRow'

type Props = {
  name: string
  parentId?: string
  order?: number
}

const insertAlbum = (model: LowDBModel<AlbumRow>) => async ({ name, parentId, order }: Props): Promise<AlbumRow> => {
  const id = uuidv4()

  const data: AlbumRow = {
    id,
    parentId: parentId || null,
    createdDate: new Date().toISOString(),
    // updatedDate: new Date().toISOString(),
    name,
    order: order || null,
  }

  if (!fetchAlbumByName(model)(name)) {
    return await model.push(data).write()
  } else {
    return await model.find({ name }).assign(data).write()
  }
}

const fetchAlbums = (model: LowDBModel<AlbumRow[]>) => (): Promise<AlbumRow[]> => model.value()
const fetchAlbumById = (model: LowDBModel<AlbumRow>) => (id: string): Promise<AlbumRow> => model.find({ id }).value()
const fetchAlbumByName = (model: LowDBModel<AlbumRow>) => (name: string): Promise<AlbumRow> =>
  model.find({ name }).value()

export default (db: LowDB) => {
  const model = db.get('albums')

  const insert = insertAlbum(model)
  const fetch = fetchAlbums(model)
  const fetchById = fetchAlbumById(model)
  const fetchByName = fetchAlbumByName(model)

  return { insert, fetch, fetchById, fetchByName }
}

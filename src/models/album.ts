import { v4 as uuidv4 } from 'uuid'
import { LowDB, LowDBModel } from '../custom'
import AlbumRow from '../interfaces/AlbumRow'

type Props = {
  name: string
  parentId?: string | null
  order?: number
}

const insertAlbum = (model: LowDBModel<AlbumRow>) => ({ name, parentId = null, order }: Props): AlbumRow => {
  const id = uuidv4()
  const data: AlbumRow = {
    id,
    parentId,
    createdDate: new Date().toISOString(), // refactor for upsert
    updatedDate: new Date().toISOString(),
    name,
    order: order || null,
  }

  const existing = fetchAlbumByName(model)(name, parentId)

  if (!existing || existing.parentId !== parentId) {
    model.push(data).write()
  } else {
    data.id = existing.id
    model.find({ name, parentId }).assign(data).write()
  }

  return data
}

const fetchAlbums = (model: LowDBModel<AlbumRow[]>) => (): AlbumRow[] => model.value()
const fetchAlbumById = (model: LowDBModel<AlbumRow>) => (id: string): AlbumRow => model.find({ id }).value()

// Parent ID allows subfolders of the same album name (2020 -> jan, 2021 -> jan)
const fetchAlbumByName = (model: LowDBModel<AlbumRow>) => (name: string, parentId: string | null) =>
  model.find({ name, parentId }).value()

export default (db: LowDB) => {
  const model = db.get('albums')

  const insert = insertAlbum(model)
  const fetch = fetchAlbums(model)
  const fetchById = fetchAlbumById(model)
  const fetchByName = fetchAlbumByName(model)

  return { insert, fetch, fetchById, fetchByName }
}

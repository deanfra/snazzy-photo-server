import album from './album'
import image from './image'
import { LowDB } from '../custom'

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const lowdb = low as any

const db = lowdb(new FileSync('./src/models/db.json')).defaults({
  albums: [],
  photos: [],
  tags: [],
  people: [],
}) as LowDB

export default {
  image: image(db),
  album: album(db),
}

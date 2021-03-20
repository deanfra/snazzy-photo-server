import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('./src/models/db.json')
const db = lowdb(adapter)

db.defaults({
  album: [],
  photos: [],
  tags: [],
  people: [],
})

export default db

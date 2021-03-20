import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

export default () => {
  const adapter = new FileSync('./src/models/db.json')
  const db = lowdb(adapter) as any

  db.defaults({
    album: [],
    photos: [],
    tags: [],
    people: [],
  })
  return db
}

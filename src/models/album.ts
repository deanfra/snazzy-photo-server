import { v4 as uuidv4 } from 'uuid'
import db from './db'

const model = () => db.get('albums')
export const insertAlbum = () => model().push({ id: uuidv4() }).write()
export const fetchAlbums = () => model().value()
export const fetchAlbum = (id: string) => model().find({ id }).value()

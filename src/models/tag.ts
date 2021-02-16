import { v4 as uuidv4 } from 'uuid'
import db from './db'

const model = () => db.get('tags')
export const insertTag = () => model().push({ id: uuidv4() }).write()
export const fetchTags = () => model().value()
export const fetchTag = (id: string) => model().find({ id }).value()

import { v4 as uuidv4 } from 'uuid'
import db from './db'

const model = () => db.get('faces')
export const insertFace = () => model().push({ id: uuidv4() }).write()
export const fetchFaces = () => model().value()
export const fetchFace = (id: string) => model().find({ id }).value()

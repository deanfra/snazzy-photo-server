import { readFileSync } from 'fs'

const reader = (path: string): Buffer => readFileSync(path)

export default reader

import * as fs from 'fs'

const reader = (path: string): Buffer => fs.readFileSync(path)

export default reader

import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'

const NAMESPACE = 'c3156ca6-2a38-556f-8ca0-792624924ad8'
const uuidFolderPrefix = 2

export const deterministicUUID = (file: Buffer) => uuidv5(file, NAMESPACE)
export const uuidPrefixed = (uuid: string, split = uuidFolderPrefix) => [
  uuid.substr(0, split),
  uuid.substr(split, uuid.length),
]

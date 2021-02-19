import { v5 as uuidv5 } from 'uuid'

const NAMESPACE = 'c3156ca6-2a38-556f-8ca0-792624924ad8'
const uuidFolderPrefix = 2

export const deterministicUUID = (file: Buffer): string => uuidv5(file, NAMESPACE)
export const uuidPrefixed = (uuid: string, split = uuidFolderPrefix): string[] => [
  uuid.substr(0, split),
  uuid.substr(split, uuid.length),
]

import { deterministicUUID } from './uuid'

type ImageProps = { base: string; path: string; file: Buffer }
type ImageWithUuid = ImageProps & { uuid: string }

const imageUuid = ({ file, ...rest }: ImageProps): ImageWithUuid => {
  const uuid = deterministicUUID(file)
  return { uuid, file, ...rest }
}

export default imageUuid

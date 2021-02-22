import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import { uuidPrefixed } from './uuid'

type ImageProps = { base: string; path: string; file: Buffer; uuid: string; exif: any; meta: any }
type ImageWithThumb = ImageProps & { thumb: string }

const makeThumbnail = ({ uuid, file, ...rest }: ImageProps): ImageWithThumb => {
  const [uuidPrefix, uuidRest] = uuidPrefixed(uuid)

  const thumbPath = path.join(__dirname, '../thumbnails/')
  const thumbPathName = `${uuidPrefix}/${uuidRest}.jpg`
  const fileLocation = thumbPath + thumbPathName

  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath)
  }

  if (!fs.existsSync(thumbPath + uuidPrefix)) {
    fs.mkdirSync(thumbPath + uuidPrefix)
  }

  sharp(file)
    .resize(150, 150)
    .toFile(fileLocation, (err) => {
      if (err) {
        console.log(err)
      }
    })

  return { uuid, file, thumb: '../thumbnails/' + thumbPathName, ...rest }
}

export default makeThumbnail

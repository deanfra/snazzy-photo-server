import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import { uuidPrefixed } from './uuid'
import ImageExif from '../interfaces/ImageExif'

type ImageProps = { base: string; path: string; file: Buffer; uuid: string; exif: ImageExif }
type ImageWithThumb = ImageProps & { thumb: string }

const imageThumbnail = ({ uuid, file, ...rest }: ImageProps): ImageWithThumb => {
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

export default imageThumbnail

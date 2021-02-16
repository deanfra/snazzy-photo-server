import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import { deterministicUUID, uuidPrefixed } from './uuid'

type ImageProps = { uuid: string; pathName: string; thumbPathName: string }

const makeThumbnail = (pathName: string): ImageProps => {
  const file = fs.readFileSync(pathName)
  const uuid = deterministicUUID(file)
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

  return { uuid, pathName, thumbPathName: '../thumbnails/' + thumbPathName }
}

export default makeThumbnail

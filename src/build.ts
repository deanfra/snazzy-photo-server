import findAllImages from './util/imageFinder'
import makeThumbnail from './util/imageThumbnail'
import { insertPhoto } from './models/image'
import getImageUuids from './util/imageUuid'
import getImageMeta from './util/imageMeta'

const dir = process.env['BASE_IMG_DIR'] || ''

const build = () => {
  console.log('🛠  Processing pictures in:', dir || '(no directory)')

  if (!dir) {
    console.error(
      '\n⚠️  Please configure a base directory for your images:\n   $ export BASE_IMG_DIR=/path/to/folder\n'
    )
    return
  }

  const processed = findAllImages(dir).map(async (image) => {
    await Promise.resolve(image).then(getImageUuids).then(getImageMeta).then(makeThumbnail).then(insertPhoto)
  })
  console.log('⚡︎', processed.length, 'pictures processing')
}

build()

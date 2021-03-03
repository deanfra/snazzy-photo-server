import findAllImages from './util/imageFinder'
import makeThumbnail from './util/imageThumbnail'
import { insertPhoto } from './models/image'
import getImageUuids from './util/imageUuid'
import getImageExif from './util/imageExif'

const dir = process.env['BASE_IMG_DIR'] || ''

const build = async () => {
  console.log('🛠  Processing pictures in:', dir || '(no directory)')

  if (!dir) {
    console.error(
      '\n⚠️  Please configure a base directory for your images:\n   $ export BASE_IMG_DIR=/path/to/folder\n'
    )
    return
  }

  console.time('build')

  console.time('find')
  const all = findAllImages(dir)
  console.timeEnd('find')
  console.time('uuids')
  const uuids = all.map(getImageUuids)
  console.timeEnd('uuids')
  console.time('exif')
  const exif = await Promise.all(uuids.map(getImageExif))
  console.timeEnd('exif')
  console.time('thumbs')
  const thumbs = exif.map(makeThumbnail)
  console.timeEnd('thumbs')
  console.time('insert')
  const inserts = Promise.all(thumbs.map(insertPhoto)).then(() => {
    console.timeEnd('insert')
    console.timeEnd('build')
  })

  // const processed = findAllImages(dir).map(async (image) => {
  //   await Promise.resolve(image).then(getImageUuids).then(getImageMeta).then(makeThumbnail).then(insertPhoto)
  // })
  // console.log('⚡︎', inserts.length, 'pictures processing')
}

build()

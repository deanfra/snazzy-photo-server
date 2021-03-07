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

  console.time('build finished')

  console.time('find finished')
  const all = findAllImages(dir)
  console.timeEnd('find finished')
  console.time('uuids finished')
  const uuids = all.map(getImageUuids)
  console.timeEnd('uuids finished')
  console.time('exif finished')
  const exif = await Promise.all(uuids.map(getImageExif))
  console.timeEnd('exif finished')
  console.time('thumbs finished')
  const thumbs = exif.map(makeThumbnail)
  console.timeEnd('thumbs finished')
  console.time('insert finished')

  Promise.all(thumbs.map(insertPhoto)).finally(() => {
    console.timeEnd('insert finished')
    console.log('-------------------------------')
    console.timeEnd('build finished')
  })

  // const processed = findAllImages(dir).map(async (image) => {
  //   await Promise.resolve(image).then(getImageUuids).then(getImageMeta).then(makeThumbnail).then(insertPhoto)
  // })
  // console.log('⚡︎', inserts.length, 'pictures processing')
}

build()

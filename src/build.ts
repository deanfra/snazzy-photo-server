import findAllImages from './util/imageFinder'
import makeThumbnail from './util/imageThumbnail'
import models from './models/'
import getImageUuids from './util/imageUuid'
import getImageExif from './util/imageExif'
import imageTagger from './util/imageTagger'

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
  const thumbs = await Promise.all(exif.map(makeThumbnail))
  console.timeEnd('thumbs finished')

  console.time('tags finished')
  const tags = thumbs.map(imageTagger)
  console.timeEnd('tags finished')

  console.time('insert finished')
  const images = tags.map(models.image.insert)
  console.timeEnd('insert finished')
  console.timeEnd('build finished')

  console.log('⚡︎', images.length, 'pictures processed')
}

build()

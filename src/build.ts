import getAllMedia from './util/finder'
import makeThumbnail from './util/thumbnails'
import { insertPhoto } from './models/photo'

const dir = process.env['BASE_IMG_DIR'] || ''

const build = () => {
  console.log('⚡︎', 'processing pictures in:', dir)
  const allMedia = getAllMedia(dir)
  const thumbs = allMedia.map(makeThumbnail)
  thumbs.map(({ uuid, pathName, thumbPathName }) => insertPhoto(dir, uuid, pathName, thumbPathName))
  console.log('⚡︎', thumbs.length, 'pictures processed')
}

build()

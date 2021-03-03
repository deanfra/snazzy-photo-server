import * as exifr from 'exifr'
import ImageMeta from '../interfaces/ImageExif'

// eslint-disable-next-line
// type ImageWithMeta = ImageProps & { path: string; exif: any; meta: ImageMeta }
// type ImageProps = { base: string; path: string; file: Buffer; uuid: string }
// type Meta = { [key: string]: string | number | null }

// const nullOrValue = (value: ValueTag | NumberArrayTag | StringArrayTag | undefined): string | number | null =>
//   value
//     ? typeof value.value === 'object'
//       ? value.value[0]
//       : typeof value.value === 'string'
//       ? value.value
//       : null
//     : null

// const nullOrDescription = (value: NumberTag | StringArrayTag | undefined): string | null =>
//   (value && value.description) || null

const imageMeta = (file: Buffer): Promise<ImageMeta> => {
  const exif = exifr.parse(file)
  return exif
}

export default imageMeta

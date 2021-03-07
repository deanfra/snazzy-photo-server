import ImageExif from '../interfaces/ImageExif'
type ImageWithExif = ImageProps & { path: string; exif: ImageExif }
type ImageProps = { base: string; path: string; file: Buffer; uuid: string }
import * as exifr from 'exifr'

const imageExif = async ({ file, ...rest }: ImageProps): Promise<ImageWithExif> => {
  const parsedExif: ImageExif = await exifr.parse(file)
  return { file, exif: parsedExif || {}, ...rest }
}

export default imageExif

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

// const imageMeta = ({ file, ...rest }: ImageProps): ImageWithMeta => {
//   const exif = ExifReader.load(file)
//   const meta: Meta = {
//     colorSpace: nullOrDescription(exif['ColorSpace']) || nullOrValue(exif['Color Space']),
//     dateCreated:
//       nullOrValue(exif['DateCreated']) ||
//       nullOrValue(exif['Date Created']) ||
//       nullOrValue(exif['Digital Creation Date']),
//     dateTime:
//       nullOrValue(exif['DateTime']) ||
//       nullOrValue(exif['DateTimeDigitized']) ||
//       nullOrValue(exif['Digital Creation Time']),
//     dateTimeOriginal: nullOrValue(exif['DateTimeOriginal']),
//     deviceManufacturer: nullOrValue(exif['Device Manufacturer']),
//     exposureMode: nullOrDescription(exif['ExposureMode']),
//     exposureTime: nullOrDescription(exif['ExposureTime']),
//     focalLength: nullOrDescription(exif['FocalLength']),
//     height: nullOrValue(exif['Image Height']),
//     ISOSpeedRatings: nullOrDescription(exif['ISOSpeedRatings']),
//     make: nullOrDescription(exif['Make']),
//     maxApertureValue: nullOrDescription(exif['MaxApertureValue']),
//     model: nullOrDescription(exif['Model']),
//     orientation: nullOrDescription(exif['Orientation']),
//     whiteBalance: nullOrDescription(exif['WhiteBalance']),
//     width: nullOrValue(exif['Image Width']),
//   }

//   // Excludes not null keys
//   const notNullMeta: Meta = Object.keys(meta).reduce(
//     (acc, cur: string) => (meta[cur] ? { ...{ [cur]: meta[cur] }, ...acc } : { ...acc }),
//     {}
//   )

//   return { file, exif, meta: notNullMeta, ...rest }
// }

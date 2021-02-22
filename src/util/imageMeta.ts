// import * as exifReader from 'exif-reader'
import ExifReader, { NumberTag, StringArrayTag, ValueTag, NumberArrayTag } from 'exifreader'
type ImageProps = { base: string; path: string; file: Buffer; uuid: string }
// eslint-disable-next-line
type ImageWithMeta = ImageProps & { path: string; exif: any; meta: any }
type Meta = { [key: string]: string | number | null }

// type MetaArgs = NumberTag | NumberArrayTag | ValueTag | StringArrayTag | undefined
// eslint-disable-next-line
const nullOrValue = (value: ValueTag | NumberArrayTag | StringArrayTag | undefined): any => 
  (value && typeof value.value === 'object' && value.value[0]) || (value && value.value) || null
const nullOrDescription = (value: NumberTag | StringArrayTag | undefined): string | null =>
  (value && value.description) || null

const imageMeta = ({ file, ...rest }: ImageProps): ImageWithMeta => {
  const exif = ExifReader.load(file)
  const meta: Meta = {
    colorSpace: nullOrDescription(exif['ColorSpace']) || nullOrValue(exif['Color Space']),
    dateCreated:
      nullOrValue(exif['DateCreated']) ||
      nullOrValue(exif['Date Created']) ||
      nullOrValue(exif['Digital Creation Date']),
    dateTime:
      nullOrValue(exif['DateTime']) ||
      nullOrValue(exif['DateTimeDigitized']) ||
      nullOrValue(exif['Digital Creation Time']),
    dateTimeOriginal: nullOrValue(exif['DateTimeOriginal']),
    deviceManufacturer: nullOrValue(exif['Device Manufacturer']),
    exposureMode: nullOrDescription(exif['ExposureMode']),
    exposureTime: nullOrDescription(exif['ExposureTime']),
    focalLength: nullOrDescription(exif['FocalLength']),
    height: nullOrValue(exif['Image Height']),
    ISOSpeedRatings: nullOrDescription(exif['ISOSpeedRatings']),
    make: nullOrDescription(exif['Make']),
    maxApertureValue: nullOrDescription(exif['MaxApertureValue']),
    model: nullOrDescription(exif['Model']),
    orientation: nullOrDescription(exif['Orientation']),
    whiteBalance: nullOrDescription(exif['WhiteBalance']),
    width: nullOrValue(exif['Image Width']),
  }

  const notNullMeta: Meta = Object.keys(meta).reduce(
    (acc, cur: string) => (meta[cur] ? { ...{ [cur]: meta[cur] }, ...acc } : { ...acc }),
    {}
  )

  return { file, exif, meta: notNullMeta, ...rest }
}

export default imageMeta

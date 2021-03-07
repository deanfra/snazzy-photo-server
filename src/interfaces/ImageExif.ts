interface ImageExif {
  [key: string]: string | number | boolean | unknown
  ApertureValue: number
  BrightnessValue: number
  CreateDate: string
  DateTimeOriginal: string
  ExifImageHeight: number
  ExifImageWidth: number
  ExifVersion: number
  ExposureCompensation: number
  ExposureMode: string
  ExposureProgram: string
  ExposureTime: number
  FNumber: number
  Flash: string
  FlashpixVersion: number
  FocalLength: number
  FocalLengthIn35mmFormat: number
  ISO: number
  LensMake: string
  LensModel: string
  Make: string
  MeteringMode: string
  Model: string
  ModifyDate: string
  Orientation: string
  ResolutionUnit: string
  SceneCaptureType: string
  SceneType: string
  SensingMethod: string
  ShutterSpeedValue: number
  Software: number
  SubSecTimeDigitized: number
  SubSecTimeOriginal: number
  TileLength: number
  TileWidth: number
  WhiteBalance: string
  XResolution: number
  YResolution: number
}

export default ImageExif

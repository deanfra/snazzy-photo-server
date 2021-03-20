declare const exifReader: any

declare module 'lowdb' {}
declare module 'exif-reader' {
  export default exifReader
}

export interface LowDB {
  get: (name: string) => LowDBModel<any>
}

export interface LowDBModel<T> {
  value: () => Promise<T>
  find: (params: any) => LowDBModel<T>
  slice: (a: number, b: number) => LowDBModel<T>
}

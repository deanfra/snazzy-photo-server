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
  find: (params: unknown) => LowDBModel<T>
  slice: (a: number, b: number) => LowDBModel<T>
  push: (data: T) => LowDBModel<T>
  assign: (data: T) => LowDBModel<T>
  write: () => Promise<T>
}

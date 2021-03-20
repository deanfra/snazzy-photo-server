interface ImageRow {
  id: string // uuid
  path: string // image path on server
  thumb: string // thumbnail path on server
  albums: string[]
  createdDate: string
}

export default ImageRow

interface AlbumRow {
  id: string
  parentId: string | null
  createdDate: string
  updatedDate: string
  name: string
  order: number | null
}

export default AlbumRow

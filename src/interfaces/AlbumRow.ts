interface AlbumRow {
  id: string
  parentId: string | null
  createdDate: string
  name: string
  order: number | null
}

export default AlbumRow

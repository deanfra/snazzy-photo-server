import express from 'express'
import path from 'path'
import { fetchPhotos } from './models/photo'

const app = express()
const port = 3000
const dir = process.env['BASE_IMG_DIR'] || ''

app.get('/images', (req, res) => {
  const photos = fetchPhotos()
  res.send(photos)
})

app.use('/', express.static(path.join(__dirname, '../static')))
app.use('/images', express.static(dir))
app.use('/thumbnails', express.static(path.join(__dirname, '../src/thumbnails')))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

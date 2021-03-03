import express from 'express'
import path from 'path'
import { fetchPhoto } from './controllers/image-controller'
import { fetchPhotos } from './models/image'

const app = express()
const port = 3000
const dir = process.env['BASE_IMG_DIR'] || ''

app.get('/images', (req, res) => {
  const photos = fetchPhotos()
  res.send(photos)
})

app.use('/', express.static(path.join(__dirname, '../static')))
app.use('/thumbnails', express.static(path.join(__dirname, '../src/thumbnails')))
console.log('serving images from:', dir)
app.use('/images', express.static(dir))
app.use('/image/:id', async (req, res) => {
  const photo = await fetchPhoto(req.params.id, dir)
  res.send(photo)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

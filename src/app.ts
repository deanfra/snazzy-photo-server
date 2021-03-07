import express, { Request } from 'express'
import path from 'path'
import { fetchPhoto, fetchPhotos } from './controllers/image-controller'
import ImageRow from './interfaces/ImageRow'

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
  fetchPhoto(req.params.id, dir)
    .then((photo) => {
      res.send(photo)
    })
    .catch((err: Error) => {
      console.error('❗️', `Error fetching: ${req.params.id}`, err.message)
      res.status(404).send(`${req.params.id} not found`)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

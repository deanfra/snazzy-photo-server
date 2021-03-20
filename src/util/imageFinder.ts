import { readdirSync, statSync } from 'fs'
import imageReader from './imageReader'

const extensions = ['ai', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'heic', 'heif', 'svg', 'tif', 'tiff']

const isImage = (path: string): boolean => {
  const extension = path.split('.').pop() || ''
  return extensions.indexOf(extension.toLowerCase()) > -1
}

type Image = { base: string; path: string; file: Buffer }

const findAllImages = (basePath: string, arrayOfFiles: Image[] = []): Image[] => {
  const originalDirectory = basePath

  const findAllIn = (basePath: string, arrayOfFiles: Image[] = []): Image[] => {
    readdirSync(basePath).forEach((filePath) => {
      const isDirectory = statSync(basePath + '/' + filePath).isDirectory()
      const fullImagePath = basePath + '/' + filePath

      if (isDirectory) {
        arrayOfFiles = findAllIn(basePath + '/' + filePath, arrayOfFiles)
      } else if (isImage(fullImagePath)) {
        const file = imageReader(fullImagePath)
        arrayOfFiles.push({ base: originalDirectory, path: fullImagePath, file })
      }
    })
    return arrayOfFiles
  }

  return findAllIn(basePath, arrayOfFiles)
}

export default findAllImages

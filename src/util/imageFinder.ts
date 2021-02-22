import * as fs from 'fs'

const extensions = ['ai', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'heic', 'heif', 'svg', 'tif', 'tiff']

const isImage = (path: string): boolean => {
  const extension = path.split('.').pop() || ''
  return extensions.indexOf(extension.toLowerCase()) > -1
}

type Image = { base: string; path: string; file: Buffer }

const findAllImages = (basePath: string, arrayOfFiles: Image[] = []): Image[] => {
  fs.readdirSync(basePath).forEach((filePath) => {
    const isDirectory = fs.statSync(basePath + '/' + filePath).isDirectory()
    const fullImagePath = basePath + '/' + filePath

    if (isDirectory) {
      arrayOfFiles = findAllImages(basePath + '/' + filePath, arrayOfFiles)
    } else if (isImage(fullImagePath)) {
      const file = fs.readFileSync(fullImagePath)
      arrayOfFiles.push({ base: basePath, path: fullImagePath, file })
    }
  })

  return arrayOfFiles
}

export default findAllImages

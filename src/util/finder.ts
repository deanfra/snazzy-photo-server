import * as fs from 'fs'

const exts = ['ai', 'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'heic', 'heif', 'svg', 'tif', 'tiff']

const isMedia = (pathName: string): boolean => {
  const ext = pathName.split('.').pop()
  return exts.indexOf(ext!) > -1
}

const getAllMedia = (path: string, arrayOfFiles: string[] = []): string[] => {
  const files = fs.readdirSync(path)

  files.forEach((file) => {
    const isDir = fs.statSync(path + '/' + file).isDirectory()
    const pathName = path + '/' + file

    if (isDir) {
      arrayOfFiles = getAllMedia(path + '/' + file, arrayOfFiles)
    } else if (isMedia(pathName)) {
      arrayOfFiles.push(pathName)
    }
  })

  return arrayOfFiles
}

export default getAllMedia

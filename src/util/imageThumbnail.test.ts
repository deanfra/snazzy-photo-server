import makeThumbnail from './imageThumbnail'
import * as path from 'path'
import { readFileSync } from 'fs'
import ImageExif from '../interfaces/ImageExif'

describe('makeThumbnail', () => {
  const mockPath = path.join(__dirname, '../../__mocks__/mock.jpg')

  it('WHEN given an image path THEN it should create a thumbnail image', () => {
    const params = {
      path: mockPath,
      uuid: '5c4bd84e-e871-58c5-8f2c-1368b553e930',
      base: '',
      file: readFileSync(mockPath),
      exif: {} as ImageExif,
    }
    expect(makeThumbnail(params)).toEqual({
      ...params,
      thumb: '../thumbnails/5c/4bd84e-e871-58c5-8f2c-1368b553e930.jpg',
    })
  })
})

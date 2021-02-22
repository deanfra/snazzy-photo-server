import makeThumbnail from './imageThumbnail'
import * as path from 'path'
import * as fs from 'fs'

describe('makeThumbnail', () => {
  const mockPath = path.join(__dirname, '../../__mocks__/mock.jpg')

  it('WHEN given an image path THEN it should create a thumbnail image', () => {
    const params = {
      path: mockPath,
      uuid: '5c4bd84e-e871-58c5-8f2c-1368b553e930',
      meta: {},
      base: '',
      file: fs.readFileSync(mockPath),
      exif: {},
    }
    expect(makeThumbnail(params)).toEqual({
      ...params,
      thumb: '../thumbnails/5c/4bd84e-e871-58c5-8f2c-1368b553e930.jpg',
    })
  })
})

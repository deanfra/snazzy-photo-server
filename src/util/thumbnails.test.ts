import makeThumbnail from './thumbnails'
import * as path from 'path'

describe('makeThumbnail', () => {
  const mockPath = path.join(__dirname, '../../__mocks__/mock.jpg')

  it('WHEN given an image path THEN it should create a thumbnail image', () => {
    expect(makeThumbnail(mockPath)).toEqual({
      pathName: mockPath,
      thumbPathName: '../thumbnails/5c/4bd84e-e871-58c5-8f2c-1368b553e930.jpg',
      uuid: '5c4bd84e-e871-58c5-8f2c-1368b553e930',
    })
  })
})

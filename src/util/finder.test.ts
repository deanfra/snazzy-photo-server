import getAllMedia from './finder'
import * as path from 'path'

describe('makeThumbnail', () => {
  const mockPath = path.join(__dirname, '../../__mocks__')

  it('WHEN given a folder path THEN it should return all image paths', () => {
    expect(getAllMedia(mockPath)).toEqual([expect.stringMatching(mockPath), expect.stringMatching(mockPath)])
  })
})

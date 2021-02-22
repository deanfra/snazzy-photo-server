import findAllImages from './imageFinder'
import * as path from 'path'

describe('imageFinder', () => {
  const mockPath = path.join(__dirname, '../../__mocks__')

  it('WHEN given a folder path THEN it should return all image information', () => {
    expect(findAllImages(mockPath)).toEqual([
      { base: expect.stringMatching(mockPath), path: expect.stringMatching(mockPath), file: expect.anything() },
      { base: expect.stringMatching(mockPath), path: expect.stringMatching(mockPath), file: expect.anything() },
    ])
  })
})

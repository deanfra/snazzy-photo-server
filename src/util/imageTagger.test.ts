import imageTagger from './imageTagger'
import ImageExif from '../interfaces/ImageExif'
import { join } from 'path'
import models from '../models/'

jest.mock('../models/album')

describe('imageTagger', () => {
  describe('GIVEN an image with meta', () => {
    const mockedModels = models as jest.Mocked<typeof models>
    const mockPath = join(__dirname, '../../__mocks__/')
    const mockImage = {
      path: 'mock.jpg',
      uuid: '----',
      base: mockPath,
      thumb: '',
      file: Buffer.from(''),
      exif: {} as ImageExif,
      meta: {},
    }

    it('THEN it create and inserts an image', async () => {
      expect(await imageTagger(mockImage)).toEqual({
        ...mockImage,
        createdDate: '2017-10-03T20:54:32.000Z',
        albums: [],
      })
      expect(mockedModels.album.insert).toHaveBeenCalledWith('October')
      expect(mockedModels.album.insert).toHaveBeenCalledWith(2017)
    })
  })
})

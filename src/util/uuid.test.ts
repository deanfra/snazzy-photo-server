import { uuidPrefixed, deterministicUUID } from './uuid'
import * as fs from 'fs'
import * as path from 'path'

describe('uuid', () => {
  const mockPath = path.join(__dirname, '../../__mocks__/mock.jpg')
  const file = fs.readFileSync(mockPath)

  describe('deterministicUUID', () => {
    it('WHEN there is a file THEN it should create a static UUID', () => {
      // const file = new Buffer('binary information')
      expect(deterministicUUID(file)).toEqual('5c4bd84e-e871-58c5-8f2c-1368b553e930')
    })
  })
  describe('uuidPrefixed', () => {
    it('WHEN a uuid is provided THEN it outputs a split string for folderising', () => {
      const prefix = uuidPrefixed('5c4bd84e-e871-58c5-8f2c-1368b553e930')
      expect(prefix).toEqual(['5c', '4bd84e-e871-58c5-8f2c-1368b553e930'])
    })
  })
})

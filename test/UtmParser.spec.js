import chai from 'chai'
import { UtmParser } from '../lib/utm-parser.js'

const assert = chai.assert

describe('UtmParser class', () => {
  describe('parseUtmParams static method', () => {
    it('should filter only provided stuff', () => {
      const queryString = {
        foo: 'test1',
        bar: 'test2'
      }

      const filter = ['foo']

      const result = UtmParser.parseUtmParams(queryString, filter)

      assert.property(result, 'foo')
      assert.notProperty(result, 'bar')
    })
  })
})

import chai from 'chai'
import { UtmParser } from '../../lib/utm-parser.js'
import { camelCase } from 'lodash'

const assert = chai.assert

describe('UtmParser class', () => {
  describe('parseParams static method', () => {
    it('should filter only provided keys', () => {
      const queryString = {
        foo: 'test1',
        bar: 'test2'
      }

      const filter = ['foo']

      const result = UtmParser.parseParams(queryString, filter)

      assert.property(result, 'foo')
      assert.notProperty(result, 'bar')
    })

    it('should camelCase kebab_cased key from query', () => {
      const queryString = {
        foo_bar: 'test1'
      }

      const filter = ['foo_bar']

      const result = UtmParser.parseParams(queryString, filter)

      assert.property(result, 'fooBar')
      assert.notProperty(result, 'foo_bar')
      assert.propertyVal(result, 'fooBar', queryString.foo_bar)
    })
  })
})

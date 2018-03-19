import chai from 'chai'
import sinon from 'sinon'
import { UtmParser } from '../../lib/utm-parser.js'
import { camelCase } from 'lodash'

const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

describe('UtmParser class', () => {
  describe('storeUtmParams static method', () => {
    const fakeStorage = {
      get: sinon.spy(),
      set: sinon.spy()
    }

    afterEach(() => {
      fakeStorage.get.resetHistory()
      fakeStorage.set.resetHistory()
    })

    it('should ignore query string without utm_source', () => {
      const queryString = {
        utm_medium: 'test1'
      }

      const storageKey = 'testStorageKey'

      const result = UtmParser.storeUtmParams(
        storageKey,
        fakeStorage,
        queryString
      )

      assert.notCalled(fakeStorage.get)
      assert.notCalled(fakeStorage.set)
    })

    it('should try to get key from storage first', () => {
      const queryString = {
        utm_source: 'test1'
      }

      const storageKey = 'testStorageKey'

      const result = UtmParser.storeUtmParams(
        storageKey,
        fakeStorage,
        queryString
      )

      assert.called(fakeStorage.get)
      assert.calledWith(fakeStorage.get, storageKey)
    })

    it('should ignore if utm_source is already defined in storage', () => {
      const fakeStorage = {
        get: sinon.spy((key) => {
          return { utmSource: 'foo' }
        }),
        set: sinon.spy()
      }

      const queryString = {
        utm_source: 'test1'
      }

      const storageKey = 'testStorageKey'

      const result = UtmParser.storeUtmParams(
        storageKey,
        fakeStorage,
        queryString
      )

      assert.called(fakeStorage.get)
      assert.notCalled(fakeStorage.set)
    })

    it('should set utm keys from query string', () => {
      const queryString = {
        utm_source: 'test1',
        utm_medium: 'test2'
      }

      const storageKey = 'testStorageKey'

      const result = UtmParser.storeUtmParams(
        storageKey,
        fakeStorage,
        queryString
      )

      assert.called(fakeStorage.set)
      assert.calledWith(fakeStorage.set, storageKey, {
        utmSource: 'test1',
        utmMedium: 'test2'
      })
    })

    it('should ignore non-utm keys', () => {
      const queryString = {
        utm_source: 'test1',
        utm_medium: 'test2',
        foo: 'test3'
      }

      const storageKey = 'testStorageKey'

      const result = UtmParser.storeUtmParams(
        storageKey,
        fakeStorage,
        queryString
      )

      assert.called(fakeStorage.set)
      assert.neverCalledWith(
        fakeStorage.set,
        storageKey,
        sinon.match.has('foo')
      )
    })
  })
})

import chai from 'chai'
import sinon from 'sinon'
import { CancelToken } from '../../lib/cancellable-promise'

const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

describe('CancelToken class', () => {
  describe('constructor', () => {
    it('should have a promise property', () => {
      const cancelToken = new CancelToken()

      assert.property(cancelToken, 'promise')
      assert.instanceOf(cancelToken.promise, Promise)
    })

    it('should have a cancelled property', () => {
      const cancelToken = new CancelToken()

      assert.property(cancelToken, 'cancelled')
      assert.propertyVal(cancelToken, 'cancelled', false)
    })
  })
})

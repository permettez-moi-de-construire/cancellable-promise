import chai from 'chai'
import sinon from 'sinon'
import { CancelError } from '../../lib/cancellable-promise'

const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

describe('CancelError class', () => {
  describe('constructor', () => {
    it('should be a subclass of error', () => {
      const cancelError = new CancelError()

      assert.instanceOf(cancelError, Error)
    })

    it('should have correct name', () => {
      const cancelError = new CancelError()

      assert.property(cancelError, 'name')
      assert.propertyVal(cancelError, 'name', 'PromiseCancelError')
    })
  })
})

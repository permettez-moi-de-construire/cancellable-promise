import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)
const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

const {
  cancellablePromise,
  CancelError,
  CancelToken
} = require('../../lib/cancellable-promise')

const cancellablePromise2 = require('../../lib/cancellable-promise')

describe('Lib scope', () => {
  describe('require', () => {
    it('should include cancellablePromise factory', () => {
      assert.isDefined(cancellablePromise)
      assert.isNotNull(cancellablePromise)
    })
    it('should include CancelError class', () => {
      assert.isDefined(CancelError)
      assert.isNotNull(CancelError)
    })
    it('should include CancelToken class', () => {
      assert.isDefined(CancelToken)
      assert.isNotNull(CancelToken)
    })
  })
})

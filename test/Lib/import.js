import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)
const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

import cancellablePromise2, {
  cancellablePromise,
  CancelError,
  CancelToken
} from '../../lib/cancellable-promise'

describe('Lib scope', () => {
  describe('import', () => {
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
    it('should expost cancellablePromise by default', () => {
      assert.isDefined(cancellablePromise2)
      assert.isNotNull(cancellablePromise2)

      assert.equal(cancellablePromise2, cancellablePromise)
    })
  })
})

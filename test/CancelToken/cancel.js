import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { CancelToken, CancelError } from '../../lib/cancellable-promise'

chai.use(chaiAsPromised)
const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

describe('CancelToken class', () => {
  describe('cancel method', () => {
    it('should be cancelled after cancel()', () => {
      const cancelToken = new CancelToken()

      cancelToken.cancel()
      assert.property(cancelToken, 'cancelled')
      assert.propertyVal(cancelToken, 'cancelled', true)
    })

    it('should reject promise with CancelError when calling cancel()', () => {
      const cancelToken = new CancelToken()

      cancelToken.cancel()
      return assert.isRejected(cancelToken.promise, CancelError)
    })
  })
})

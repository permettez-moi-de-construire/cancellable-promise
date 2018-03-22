import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { cancellablePromise, CancelToken, CancelError } from '../../lib/cancellable-promise'
import { noop } from 'lodash'

chai.use(chaiAsPromised)
const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

describe('cancellablePromise factory', () => {
  describe('factory', () => {
    it('should return initial promise without token provided', () => {
      const initialPromise = new Promise(noop)

      const wrappedPromise = cancellablePromise(initialPromise)

      assert.strictEqual(initialPromise, wrappedPromise)
    })

    it('should return a wrapped promise when token provided', () => {
      const initialPromise = new Promise(noop)
      const cancelToken = new CancelToken()

      const wrappedPromise = cancellablePromise(initialPromise, cancelToken)

      assert.notStrictEqual(initialPromise, wrappedPromise)
    })

    it('should return a rejected promise when cancelled token provided', () => {
      const initialPromise = new Promise(noop)
      const cancelToken = new CancelToken()
      cancelToken.cancelled = true

      const wrappedPromise = cancellablePromise(initialPromise, cancelToken)

      return assert.isRejected(wrappedPromise, CancelError)
    })

    it('should reject promise if cancel before resolve underlying promise', () => {
      const initialPromise = new Promise(noop)
      const cancelToken = new CancelToken()

      const wrappedPromise = cancellablePromise(initialPromise, cancelToken)

      cancelToken.cancel()

      return assert.isRejected(wrappedPromise, CancelError)
    })

    it('should resolve promise if cancel after resolve underlying promise', () => {
      let resolvePromise
      const initialPromise = new Promise((resolve, reject) => {
        resolvePromise = resolve
      })
      const cancelToken = new CancelToken()
      resolvePromise()

      const wrappedPromise = cancellablePromise(initialPromise, cancelToken)

      cancelToken.cancel()

      return assert.isFulfilled(wrappedPromise)
    })
  })
})

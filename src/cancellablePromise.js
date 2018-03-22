import CancelError from './CancelError'

const cancellablePromise = (initialPromise, cancelToken) => {
  if(!cancelToken) {
    return initialPromise
  }

  if(cancelToken.cancelled) {
    return Promise.reject(new CancelError())
  }

  return Promise.race([
    initialPromise,
    cancelToken.promise
  ])
}

export default cancellablePromise

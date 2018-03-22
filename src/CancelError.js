class CancelError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PromiseCancelError'
  }
}

export default CancelError

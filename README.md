# webpack-library-starter

Non intrusive Promise wrapper to make it cancellable

[![Build status](https://travis-ci.org/permettez-moi-de-construire/cancellable-promise.svg?branch=master)](https://travis-ci.org/permettez-moi-de-construire/cancellable-promise.svg?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/f450bd914887df9c6ddc/maintainability)](https://codeclimate.com/github/permettez-moi-de-construire/cancellable-promise/maintainability)

## Installation

```
npm install @permettezmoideconstruire/cancellable-promise
```

or include

```
<script src="https://unpkg.com/@permettezmoideconstruire/cancellable-promise"></script>
```

You can specify a npm release with

```
<script src="https://unpkg.com/@permettezmoideconstruire/cancellable-promise@0.0.1"></script>
```

## Usage

```
// Import
import {
  cancellablePromise,
  CancelError,
  CancelToken
} from '@permettezmoideconstruire/cancellable-promise'

// --- OR ---

const {
  cancellablePromise,
  CancelError,
  CancelToken
} = require('@permettezmoideconstruire/cancellable-promise').default


// Wrap a promise
const initialPromise = SOMETHING_ASYNC()
const cancelToken = new CancelToken()
const wrappedPromise = cancellablePromise(initialPromise, cancelToken)


// Somewhere, cancel the promise...
cancelToken.cancel()


//Then catch it
wrappedPromise
.then((res) => {
  //Actual, usual fulfill
})
.catch((err) => {
  if(err instanceOf CancelError) {
    //Handle cancel error
  }

  //Handle actual, usual error
})
```

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

## Scripts

* `npm run compile` - produce builds for the app
* `npm run test` - run tests
* `npm run build` - compile and run tests
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test:watch` - run tests in watch mode

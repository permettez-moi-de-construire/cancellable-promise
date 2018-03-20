# utm-parser

Webpack based boilerplate for producing libraries (Input: ES6, Output: universal library)

[![Build status](https://travis-ci.org/permettez-moi-de-construire/store-utm.svg?branch=master)](https://travis-ci.org/permettez-moi-de-construire/store-utm.svg?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/85b6789bb4dbdf459f04/maintainability)](https://codeclimate.com/github/permettez-moi-de-construire/store-utm/maintainability)

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

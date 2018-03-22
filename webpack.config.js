const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const path = require('path')
const env = require('yargs').argv.env
const pkg = require('./package.json')
const _ = require('lodash')

const packageName = pkg.name.split('/').pop()

const libraryName = _.camelCase(packageName)
const fileName = _.kebabCase(packageName)

let plugins = []
let outputFile

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }))
  outputFile = fileName + '.min.js'
} else {
  outputFile = fileName + '.js'
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_'
    }
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
}

module.exports = config

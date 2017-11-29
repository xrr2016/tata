const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  entry: path.join(__dirname, 'src', 'tata'),
  output: {
    filename: 'tata.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'tata',
    libraryTarget: 'umd'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.js?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ]
}

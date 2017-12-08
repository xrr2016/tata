const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: ['./src/tata.js'],
  output: {
    filename: 'tata.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'tata',
    libraryTarget: 'var'
  },
  target: 'web',
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
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
}

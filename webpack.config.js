const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    filename: `${pkg.name}.min.js`,
    path: path.resolve(__dirname, 'dist'),
    library: `${pkg.name}`,
    libraryTarget: "umd"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
      test: /.js?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader'
    }]
  },
  pplugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};
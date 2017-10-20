const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dist = path.resolve(__dirname, 'dist')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: dist
  },
  module: {
    rules: [
      {
        test: /.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader', options: { importLoaders: 1} },
          { loader: 'postcss-loader'}
        ]
      }, {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: dist,
    port: 8003
  },
  devtool: 'source-map'
}

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dist = path.resolve(__dirname, 'dist')

// TODO: react hot reload
module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    filename: 'app.js',
    path: dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader', options: { importLoaders: 1} },
          { loader: 'postcss-loader'}
        ]
      }, {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              "env", {
                "targets": {
                  "browsers": ["last 2 versions", "safari >= 7"]
                }
              }
            ], 'es2015', 'react']
          }
        }
      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: dist,
    port: 8003,
    hot: true
  },
  devtool: 'source-map'
}

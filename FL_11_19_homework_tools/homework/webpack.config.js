const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  target: 'web',
  mode: 'development',

  entry: ['./src/js/app.js', './src/scss/main.scss'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js',
    publicPath: 'dist'
  },

  devServer: {
    stats: 'minimal',
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    https: false
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new ImageminPlugin({
      test: /\.(jpg|png)$/
    }),
    new CopyPlugin([
      { from: 'src/img', to: './img' },
      { from: 'src/index.html', to: './' }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new webpack.LoaderOptionsPlugin({ options: {} })
  ]
};

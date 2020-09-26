const CopyPlugin = require('copy-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/',
  devtool: 'cheap-module-source-map',
  entry: {
    background: './src/scripts/background.js',
    popup: './src/popup/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'resolve-url-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/popup/index.html', to: 'popup.html' },
        {
          from: '**/*',
          context: 'public',
        },
      ],
    }),
  ],
}

if (process.env.NOVE_ENV === 'development') {
  config.plugins = (config.plugins || []).concat([new ExtensionReloader()])
}

module.exports = config

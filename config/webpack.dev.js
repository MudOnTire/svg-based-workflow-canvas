const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html')
  })],
  devServer: {
    static: path.resolve(__dirname, '../dist')
  },
});
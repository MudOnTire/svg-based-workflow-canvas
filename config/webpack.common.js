const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, '../src')
    },
  },
  output: {
    filename: 'flood.js',
    path: path.join(__dirname, '../dist')
  }
}
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [{
          loader: 'tslint-loader',
          options: {
            /* Loader options go here */
          }
        }]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      test: path.resolve(__dirname, 'test')
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
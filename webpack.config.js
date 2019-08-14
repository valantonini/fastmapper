const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [{
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
        test: /\.m?js$/,
        use: [{
          loader: 'ts-loader',
          options: {
            /* Loader options go here */
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            /* Loader options go here */
          }
        }],
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
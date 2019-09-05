const path = require('path');



module.exports = {
  entry: './src/FastMapper.ts',
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
    path: path.resolve(__dirname, 'dist'),
    library: "fastmapper",
    libraryTarget: "commonjs-module"
  }
};

if (process.env.NODE_ENV === "debug") {
  //If you would to use breakpoint in vscode, then must be set devtool to "eval" base
  module.exports.devtool = "eval"; 
  module.exports.output = Object.assign(module.exports.output, {
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  });
}
const path = require('path');
const config = {
    devtool: 'inline-source-map',
    entry: {
      index: './src/index.js',
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist/'),
        library:"[name]",
        libraryTarget:"umd"
    },
    externals:{
        fs:'fs'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env','stage-0'],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
          },
          include: [],
          exclude: /node_modules/
        },
      ]
    },
    plugins: [],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {}
    }
  };
  
  module.exports = config;
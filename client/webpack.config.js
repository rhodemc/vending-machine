const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    // entry point for files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // output point for files
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // create service worker
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Jate',
      }),
      // inject service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
      // create manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Vending Machine',
        short_name: 'VM',
        description: 'A text editor vending machine!',
      }),
    ],

    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { 
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    },
  };
};

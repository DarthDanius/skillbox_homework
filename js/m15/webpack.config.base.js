const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const NODE_ENV = JSON.stringify(process.env.NODE_ENV);
console.log('NODE_ENV: ' + NODE_ENV);
const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'build'),
};
module.exports = {

  mode: 'production',
  
  externals: {
    paths: PATHS
  },
  
  context: PATHS.src,

  entry: {
    main: './script/index.js',
  },

  output: {
    path: PATHS.dist,
    filename: `script/[name].js`,
    sourceMapFilename: "script/[name].js.map",
    publicPath: '/',
    // library: 'webpackVariable'
  },

  // devtool:"source-map",
  
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: NODE_ENV
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    }),
  ],
  
  module: {
    rules: [

      {
        test: /\.(png|jpg|ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {name: '[path][name].[ext]'}
        }]
      },

      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {sourceMaps: true}
        }
      },
      
      {
        test: /\.(js|jsx)$/,
        use: ["source-map-loader"],
        enforce: "pre"
     },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          
          {loader: 'style-loader'},

          {loader: 'css-loader',
            options: {'url': false,}
          },

          {loader: 'postcss-loader',
            options: {sourceMap: true}
          },

          {loader: 'sass-loader'},

          // {loader: 'stylefmt-loader',
          //   options: {}
          // },
        ]
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    },
  },

};
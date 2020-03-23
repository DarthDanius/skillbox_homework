const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function searchObjToValue(arr, key, value){
  let result = null;
  for (let i of arr) {
    if (Array.isArray(i)) {
      result = searchObjToValue(i, key, value);
      if (result) break;
    }
    if (typeof i === "object") {
      if (i.hasOwnProperty(key)) {
        if ( i[key] == value) {
          result = i;
          break;
        }
      }
      else result = searchObjToValue(Object.values(i), key, value);
      if (result) break;
    }
  }
  return result
}

function pushAfterObject(obj, key, value, options = {}){

  function searchArrToValue(obj, key, value){

    let result = {};//{ key1: [ {key2: value} ] } => key1, indexObj

    for ( let i of Object.entries(obj) ) {//[ ['0', [...] ], ['1', 'b'], ['2', {...}] ]
      if ( Array.isArray(i[1]) ){
        for ( let j = 0; j < i[1].length; j++ ) {//[...] => [ {key:value} {key:value} {key:value} ]
          if (typeof i[1][j] === 'object'){
            
            if (i[1][j][key] === value){
              result.parent = obj;
              result.key = i[0];
              result.index = j
              break;
            } else {
              result = searchArrToValue(i[1][j], key, value);
              if ( result.hasOwnProperty('key') ) break;
            }
          }
        }
      }
    }
    return result;
  }

  let result = searchArrToValue(obj, key, value);
  result.parent[result.key].splice(result.index +1, 0, options);
}

// searchObjToValue( webpackConfigBase.module.rules, 'loader', 'css-loader').options = {'url': false, 'importLoaders': 5};
pushAfterObject( webpackConfigBase.module, 'loader', 'style-loader', {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}});

const webpackConfigBuild = merge(webpackConfigBase, {

  mode: 'production',
  // mode: 'development',

  plugins: [

    new CopyWebpackPlugin([
        { from: webpackConfigBase.externals.paths.src + '/img', to: `img` },
        { from: webpackConfigBase.externals.paths.src + '/favicon', to: `favicon` },
        { from: webpackConfigBase.externals.paths.src + '/fonts', to: `fonts` },
      ]),
    new MiniCssExtractPlugin({
      filename: `style/[name].css`,
    }),
    new BundleAnalyzerPlugin()

  ],

  optimization: {
    // namedModules: true,

    nodeEnv: 'production',

    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unsafe: true,
            inline: true,
            passes: 2,
            keep_fargs: false,
          },
          output: {
            beautify: false,
          },
          mangle: true,
        },
      })
    ]
  }
});

// export webpackConfigBuild
module.exports = new Promise((resolve, reject) => {
  resolve(webpackConfigBuild);
});
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');



const webpackConfigDev = merge(webpackConfigBase, {

	mode: 'development',
	devServer: {
		port: 8080,
		overlay: {
			warning: true,
			errors: true
		},
		contentBase: path.normalize(webpackConfigBase.externals.paths.dist),
		publicPath: 'build',
		
	},
	
	// watch: true,
	// watchOptions: {
	// 	aggregateTimeout: 100
	// },
	
	devtool: 'eval',
	
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		})
	],

	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					
					{loader: MiniCssExtractPlugin.loader},
					{loader: 'css-loader',
						options: {
							'url': false, 
							'import': false,
							'sourceMap': true,
							'importLoaders': 3,
						}
					},
					{loader: 'postcss-loader',
						options: { 
							sourceMap: true,
						}
					},
					{loader: 'stylefmt-loader',
						options: {

						}
					},
				]
			},
		]
	}
	
});

module.export = new Promise((resolve, reject) => {
	resolve(webpackConfigDev);
});

console.log(`devServer.contentBase = ${webpackConfigDev.devServer.contentBase}`);
console.log(`devServer.publicPath = ${webpackConfigDev.devServer.publicPath}`);
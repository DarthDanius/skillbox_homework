const path = require('path');

const webpack = require('webpack');
// const CopyWebpackPlugin  = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
const PATHS = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'build'),
};

module.exports = {
	
	externals: {
		paths: PATHS
	},
	
	context: PATHS.src,
	entry: {
		main: './index.js',
	},

	output: {
		path: PATHS.dist,
		filename: `scrips/[name].js`,
		publicPath: '/',
		library: 'webpackVariable'
	},

	mode: 'development',

	devServer: {
		port: 8080,
		overlay: {
			warning: true,
			errors: true
		},
		contentBase: path.normalize(PATHS.dist),
		// publicPath: '/build/',
		hot: true,
		// useLocalIp: true,
		
	},

	// watch: true,
	watchOptions: {
		aggregateTimeout: 100
	},
	
	devtool: 'inline-source-map',
	
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}),
		new MiniCssExtractPlugin({
			filename: `style/[name].css`,
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery',
		}),
		// new StyleLintPlugin({
		// 	context: `${PATHS.src}/style`,
		// 	// // files: 'init.css'
		// 	files: ['**/*.s?(a|c)ss'],
		// 	syntax: 'css'
		// }),


		
		// new CopyWebpackPlugin([
			// {'from': `${PATHS.src}/img`, 'to': `${PATHS.dist}/img`}
		// ]),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		})
	],
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					
					{loader: 'style-loader'},
					
					// {loader: MiniCssExtractPlugin.loader,
					// 	options: {
					// 		publicPath: './build/style',
					// 	},
					// },
					{loader: 'css-loader',
						options: {
							'url': false, 
							// 'import': false,
							// 'sourceMap': true,
							// 'localsConvention': 'camelCase',
							'importLoaders': 3,
						}
					},
					{loader: 'postcss-loader',
						options: { 
							// sourceMap: true,
						}
					},
					{loader: 'sass-loader'},
					{loader: 'stylefmt-loader',
						options: {

						}
					},
				]
			},
			
			// {
				// test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
				// loader: 'url-loader',
				// options: {
					// limit: 8192,
				// },
			// },
			
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				use: [{
					loader: 'file-loader',
					options: {
						// publicPath: './build/style',
						// outputPath: './build/style',
						// context: './build/style',
						name: 'img/[name].[ext]'
					}
				}]
			},
		],
	},
	
	optimization: {
		minimizer: [
			new UglifyJsPlugin()
		]
	}
};


console.log(`context = ${module.exports.context}`);
console.log(`entry.main = ${module.exports.entry.main}`);
console.log(`output.path = ${module.exports.output.path}`);
console.log(`output.filename = ${module.exports.output.filename}`);
console.log(`output.publicPath = ${module.exports.output.publicPath}`);
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');

const webpackConfigBuild = merge(webpackConfigBase, {
	mode: 'production',
	// plugins: []
});

module.export = new Promise((resolve, reject) => {
	resolve(webpackConfigBuild);
});
const path = require('path');
console.log('postcss.config подключен');

module.exports = {
	plugins: [
		require('postcss-preset-env'),
		require('autoprefixer'),
		require('css-mqpacker'),
		require('cssnano')({preset: ['default', {
			cssDeclarationSorter: true,
			normalizeWhitespace: false,
			mergeRules: false
		}]}),
		require('postcss-normalize')({ browsers: 'last 2 versions' }),
		// require('stylelint'),
		require('stylefmt')
	]
}

// const postcss = require('postcss')
// const postcssNormalize = require('postcss-normalize')

// postcss([postcssNormalize(/* pluginOptions */)]).process(YOUR_CSS /*, processOptions */)
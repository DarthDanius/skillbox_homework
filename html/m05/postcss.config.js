const path = require('path');
console.log('postcss.config подключен');

// module.exports = {
	// plugins: {
		// 'postcss-preset-env': {},
		// 'autoprefixer': {},
		// 'css-mqpacker': {},
		// 'cssnano': {preset: [
			// 'default', {
			// cssDeclarationSorter: true,
			// normalizeWhitespace: false,
				
			// }
		// ]},
	// }
// }

// ({preset: ['default', {cssDeclarationSorter: true,	normalizeWhitespace: false}]})


module.exports = {
	plugins: [
		require('postcss-preset-env'),
		require('autoprefixer'),
		require('css-mqpacker'),
		require('cssnano')({preset: ['default', {cssDeclarationSorter: true,	normalizeWhitespace: false}]}),
		// require('stylelint'),
		require('stylefmt')
	]
}

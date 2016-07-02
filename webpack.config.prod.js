const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	progress: true,
	colors: true,
	devtool: 'eval-cheap-module-source-map',
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, 'public/'),
		filename: 'webpack.js',
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
				plugins: [
					'transform-react-jsx',
				],
			},
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass'],
		}],
	},
	plugins: [
		new LiveReloadPlugin({
			appendScriptTag: true,
		}),
	],
};

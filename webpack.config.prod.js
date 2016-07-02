const path = require('path');
const webpack = require('webpack');

module.exports = {
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
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.UglifyJsPlugin({ minimize: true }),
	],
};

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

const common = merge([{
	entry: './src/index.js',
	output: {
		path: PATHS.build,
		filename: 'scripts/[name].js',
		publicPath: 'dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.source + '/pages/index/index.pug'
		}),
		new ExtractTextPlugin("styles.css")
	]},
	pug(),
	sass(),
	css()
]);

module.exports = (env, argv) => {
	if (env === 'production') {
		return common
	}

	if (env === 'development') {
		return merge(
			[
				common,
				devserver()
			]
		)
	}
};

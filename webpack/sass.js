const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => {
	return {
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader']
					}),
					exclude: '/node_modules/'
				}
			]
		}
	};
};
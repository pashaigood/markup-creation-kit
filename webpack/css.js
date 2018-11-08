const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => {
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader']
					}),
					exclude: '/node_modules/'
				}
			]
		}
	};
};
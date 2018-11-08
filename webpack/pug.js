const path = require('path');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

module.exports = () => {
	return {
		devServer: {
			overlay: true,
			stats: 'errors-only',
			publicPath: "/",
			contentBase: './' + PATHS.build,
			port: 9000
		}
	}
}
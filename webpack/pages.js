const HtmlWebpackPlugin = require('html-webpack-plugin');

var walkSync = function(dir, filelist) {
	var fs = fs || require('fs'),
		files = fs.readdirSync(dir);
	filelist = filelist || [];
	files.forEach(function(file) {
		if (fs.statSync(dir + '/' + file).isDirectory()) {
			filelist = walkSync(dir + '/' + file + '/', filelist);
		}
		else {
			filelist.push(file);
		}
	});
	return filelist;
};

module.exports = () => {
	const pagesNames = walkSync('./src/pages');

	return pagesNames.map(function(pageName) {
		return new HtmlWebpackPlugin({
			filename: pageName.replace("pug", "html"),
			template: 'src/pages/' + pageName
		});
	});
}
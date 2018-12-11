const path = require('path');

module.exports = {
  source: path.join(process.cwd(), 'src'),
  build: path.join(process.cwd(), 'dist'),
};

module.exports.pages = path.join(module.exports.source, 'pages');
module.exports.fonts = path.join(module.exports.source, 'fonts');
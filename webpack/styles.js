const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoPrefixer = require('autoprefixer');

module.exports = () => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  };

  const postLoader = {
		loader: 'postcss-loader',
		options: {
			plugins: [
				autoPrefixer()
			],
			sourceMap: true
		}
	};

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader]
          }),
          exclude: '/node_modules/'
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [cssLoader, postLoader, 'sass-loader']
          }),
          exclude: '/node_modules/'
        },
        {
          test: /\.styl$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
    			  use: [cssLoader, postLoader, 'stylus-loader']
					}),
					exclude: '/node_modules/'
        },
				{
					test: /\.less$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [cssLoader, postLoader, 'less-loader']
					}),
					exclude: '/node_modules/'
				}
      ]
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'styles.css', disable: true })
    ]
  };
}
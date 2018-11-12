module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              name: '[name].[ext]'
            }
          }],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }],
        },
      ],
    },
  };
};
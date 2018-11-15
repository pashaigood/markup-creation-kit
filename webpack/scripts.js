module.exports = env => {
  return {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: [
            // 'file-loader?name=scripts/part_[name].js',
            // 'extract-loader',
            'babel-loader',
          ],
          exclude: '/node_modules/',
        },
      ],
    },
  };
};

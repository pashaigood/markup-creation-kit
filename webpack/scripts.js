module.exports = env => {
  return {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: 'babel-loader',
          exclude: '/node_modules/',
        },
      ],
    },
  };
};

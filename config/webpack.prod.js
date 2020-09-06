const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.DEVELOPMENT': false,
  }),
  new CleanWebpackPlugin(),
];

module.exports = merge(
  {
    mode: 'production',
    plugins,
  },
  common,
);

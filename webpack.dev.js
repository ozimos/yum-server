/* eslint import/no-extraneous-dependencies: off */
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [
        'style-loader',
        'css-loader', 'postcss-loader', 'sass-loader'
      ],
    },
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'client/dist'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 9000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
});
/* eslint import/no-extraneous-dependencies: off */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  entry: {
    index: './client/src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: '[name].[hash].js'
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  module: {
    rules: [{
      test: /\.(png|jp(e*)g|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: 'images/[hash]-[name].[ext]'
        }
      }]
    },
    {
      test: /\.(js|jsx?)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: 'client/public/images',
      to: 'images'
    }]),
  ],
};
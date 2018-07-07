/* eslint import/no-extraneous-dependencies: off */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import HtmlWebpackExternalsPlugin from 'html-webpack-externals-plugin';

export default {
  entry: {
    index: ['./client/src/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
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
    new CleanWebpackPlugin('./client/dist'),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      inject: true,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'jquery',
          entry: 'https://unpkg.com/jquery@3.3.1/dist/jquery.min.js',
          global: 'jQuery',
        },
        {
          module: 'cloudinary',
          entry: 'https://widget.cloudinary.com/global/all.js',
          global: 'cloudinary',
        },
        {
          module: 'popper',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
          global: 'popper',
        },
        {
          module: 'bootstrap',
          entry: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
        },
        {
          module: 'bootstrap',
          entry: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js',
        }
      ],
    }),
    new HtmlWebpackHarddiskPlugin(),
    new CopyWebpackPlugin([{
      from: 'client/public/images',
      to: 'images'
    }]),
  ],
};
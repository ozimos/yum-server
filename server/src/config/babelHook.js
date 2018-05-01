/* eslint import/no-extraneous-dependencies: off */

require('babel-register')({
  plugins: [
    'add-module-exports'
  ]
});
require('dotenv').config();
module.exports = require('./config.js');

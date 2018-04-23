/* eslint no-global-assign: off */
require = require('esm')(module);
module.exports = require('./src/bin/www.js').default;

var webpack = require('webpack');
var makeWebpackConfig = require('react-styleguidist').MakeWebpackConfig;
var config = require('react-styleguidist').Config.readConfig();

webpack(makeWebpackConfig('production'), __dirname, config);

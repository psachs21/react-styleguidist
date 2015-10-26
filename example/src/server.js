#!/usr/bin/env node
'use strict';

var express = require('express');
var webpack = require('webpack');
var makeWebpackConfig = require('react-styleguidist').MakeWebPackConfig;
var config = require('react-styleguidist').Config.readConfig();

var app = express();
console.log("----");
console.log(__dirname);
var compiler = webpack(makeWebpackConfig('development', __dirname, config));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(config.serverPort, config.serverHost);

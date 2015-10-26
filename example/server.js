#!/usr/bin/env node
'use strict';

var express = require('express');
var webpack = require('webpack');
var makeWebpackConfig = require('react-styleguidist').MakeWebPackConfig;

var app = express();
var compiler = webpack(makeWebpackConfig('development', __dirname + '/src'));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3005, 'localhost');

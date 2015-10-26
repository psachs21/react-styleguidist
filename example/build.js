var webpack = require('webpack');
var styleguidist = require('react-styleguidist');
var makeWebpackConfig = styleguidist.MakeWebpackConfig;
var config = styleguidist.Config;

module.exports = function build(callback) {
	webpack(makeWebpackConfig('production', __dirname, 'src'), function(err, stats) {
		callback(err, stats, config);
	});
};

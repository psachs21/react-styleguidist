var fs = require('fs');
var path = require('path');
var glob = require('glob');
var prettyjson = require('prettyjson');
var config = require('../src/utils/config');

function processComponent(filepath) {
	var examplesFile = config.getExampleFilename(filepath);
	var hasExamples = !!fs.existsSync(examplesFile);
	return '{' + [
			'filepath: ' + JSON.stringify(filepath),
			'module: ' + requireIt(filepath),
			'props: ' + requireIt('!!props!' + filepath),
			'examples: ' + (hasExamples ? requireIt('examples!' + examplesFile) : null)
		].join(',') + '}';
}

function requireIt(filepath) {
	return 'require(' + JSON.stringify(filepath) + ')';
}

module.exports = function() {};
module.exports.pitch = function() {
	this.cacheable && this.cacheable();

	var componentSources;
	if (typeof config.components === 'function') {
		componentSources = config.components(config, glob);
	}
	else {
		componentSources = glob.sync(path.join(config.rootDir, config.components));
	}

	if (config.verbose) {
		console.log();
		console.log('Loading components:');
		console.log(prettyjson.render(componentSources));
		console.log();
	}

	var components = componentSources.map(processComponent);

	return [
		'module.exports = {',
		'	title: ' + JSON.stringify(config.title) + ',',
		'	highlightTheme: ' + JSON.stringify(config.highlightTheme) + ',',
		'	components: [' + components.join(',') + '],',
		' baseComponent: { filepath: ' + JSON.stringify(config.baseComponentLocation) +',',
			' module: ' + requireIt(config.baseComponentLocation) + '}',
		'};'
	].join('\n');
};

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var prettyjson = require('prettyjson');
var config = require('../utils/config');

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
		componentSources = glob.sync(path.join(config.componentsToDocDir, config.components));
	}

	if (config.verbose) {
		console.log();
		console.log('Loading components:');
		console.log(prettyjson.render(componentSources));
		console.log();
	}

	var components = componentSources.map(processComponent);

	return [
		'function setComponentsNames(c) {',
		'	return c.map(function(c1) {',
		'		var module = c1.module;',
		'		c1.name = module.displayName || module.name;',
		'		if (!c1.name) {',
		'			throw Error("Cannot detect component name for " + c1.filepath);',
		'		}',
		'		return c1;',
		'	});',
		'}',

		'function globalizeComponents(c3) {',
		'	c3.map(function(c4) {',
		'		global[c4.name] = c4.module;',
		'	});',
		'}',
		'var components = setComponentsNames([' + components.join(',') + ']);',
		'globalizeComponents(components);',
		'module.exports = {',
		'	title: ' + JSON.stringify(config.title) + ',',
		'	highlightTheme: ' + JSON.stringify(config.highlightTheme) + ',',
		'	components: components',
		'};'
	].join('\n');
};

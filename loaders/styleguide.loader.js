var fs = require('fs');
var path = require('path');
var glob = require('glob');
var prettyjson = require('prettyjson');
var config;

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

module.exports = function() {
};

module.exports.pitch = function() {
	this.cacheable && this.cacheable();

	config = require(this.resourcePath);

	var componentSources;
	if (typeof config.components === 'function') {
		componentSources = config.components(config, glob);
	}
	else {
		config.componentsToDocDir.map(function (dir) {
			componentSources = componentSources.concat(glob.sync(path.join(dir, config.components)));
		});
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
		'		return c1;',
		'	}).filter(function(component){',
		'		return component.name;',
		'	});',
		'}',

		'function globalizeComponents(c3) {',
		'	c3.map(function(c4) {',
		'		if(c4)	global[c4.name] = c4.module;',
		'	});',
		'}',
		'var components = setComponentsNames([' + components.join(',') + ']);',
		'globalizeComponents(components);',
		'module.exports = {',
		'	components: components',
		'};'
	].join('\n');
};

var fs = require('fs');
var path = require('path');
var findup = require('findup');
var minimist = require('minimist');
var prettyjson = require('prettyjson');
var _ = require('lodash');
var utils = require('./server');

var CONFIG_FILENAME = 'styleguide.config.js';
var DEFAULT_CONFIG = {
	componentsToDocDir: ['./lib'],
	components: '/components/**/*.js',
	title: 'Style guide',
	styleguideDir: 'styleguide',
	template: path.join(__dirname, '../example/src/templates/index.html'),
	serverHost: 'localhost',
	serverPort: 3000,
	highlightTheme: 'base16-light',
	verbose: false,
	getExampleFilename: function(componentpath) {
		return path.join(path.dirname(componentpath), 'Readme.md');
	},
	updateWebpackConfig: null,
	rootDir:	'./src',
	hideErrors:	false,
	errorComponent: 'redbox-react'
};

function readConfig() {
	var argv = minimist(process.argv.slice(2));
	var configFilepath = findConfig(argv);
	var options = require(configFilepath);

	validateConfig(options);

	var configDir = path.dirname(configFilepath);
	var componentsToDocDir = options.componentsToDocDir.map(function (dir){
		var docDir = path.resolve(configDir, dir);
		if (docDir === configDir) {
			throw Error('Styleguidist: "componentsToDocDir" should not point to a folder with the Styleguidist config and node_modules folder');
		}
		if (!utils.isDirectoryExists(docDir)) {
			throw Error('Styleguidist: "componentsToDocDir" directory not found: ' + docDir);
		}
		return docDir;
	});



	options = _.merge({}, DEFAULT_CONFIG, options);
	options = _.merge({}, options, {
		verbose: !!argv.verbose,
		componentsToDocDir: componentsToDocDir,
		styleguideDir: path.resolve(configDir, options.styleguideDir),
		rootDir: path.resolve(configDir, options.rootDir),
		configDir: configDir
	});

	if (options.verbose) {
		console.log();
		console.log('Using config file:', configFilepath);
		console.log(prettyjson.render(options));
		console.log();
	}

	return options;
}

function findConfig(argv) {
	if (argv.config) {
		// Custom config location

		var configFilepath = path.join(process.cwd(), argv.config);
		if (!fs.existsSync(configFilepath)) {
			throw Error('Styleguidist config not found: ' + configFilepath + '.');
		}
		return configFilepath;
	}
	else {
		//Search config file in all parent directories

		var configDir;
		try {
			configDir = findup.sync(__dirname, CONFIG_FILENAME);
		}
		catch (e) {
			throw Error('Styleguidist config not found: ' + CONFIG_FILENAME + '.');
		}

		return path.join(configDir, CONFIG_FILENAME);
	}
}

function validateConfig(options) {
	if (!options.rootDir) {
		throw Error('Styleguidist: "rootDir" options is required.');
	}
	if (!options.componentsToDocDir) {
		throw Error('Styleguidist: "componentsToDocDir" options is required.');
	}
	if (!options.components) {
		throw Error('Styleguidist: "components" options is required.');
	}
	if (options.getExampleFilename && typeof options.getExampleFilename !== 'function') {
		throw Error('Styleguidist: "getExampleFilename" options must be a function.');
	}
	if (options.updateWebpackConfig && typeof options.updateWebpackConfig !== 'function') {
		throw Error('Styleguidist: "updateWebpackConfig" options must be a function.');
	}
}

module.exports = readConfig();

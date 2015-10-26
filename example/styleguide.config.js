module.exports = {
	title: 'Style guide example',
	rootDir: './lib',
	components: function(config, glob) {
		console.log(config);
		return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
			console.log(module);
			console.log(/\/[A-Z][a-z]*\.js$/.test(module));
			return /\/[A-Z][a-z]*\.js$/.test(module);
		});
	}
};

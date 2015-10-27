module.exports = {
	title: 'Style guide example',
	componentsToDocDir: ['./lib'],
	components: function(config, glob) {
		return glob.sync(config.componentsToDocDir[0] + '/components/**/*.js').filter(function(module) {
			return /\/[A-Z][a-z]*\.js$/.test(module);
		});
	},
	rootDir: './src'
};

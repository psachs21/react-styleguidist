# React Styleguidist

A basic set of loaders basically ripped out of [react-styleguidist](https://github.com/sapegin/react-styleguidist)


## Installation

```
npm install --save git:github.com/psachs21/react-styleguidist
```

To install the loaders, just add ```node_modules/react-styleguidist/loaders``` to your resolveLoader.modulesDirectories in your webpack config.

You can then get component information by calling the loader on your styleguide config: ```let { components } = require('styleguide!../styleguide.config.js');```

See the configuration section below for details on the config.

## Documenting components

### PropTypes

Components `PropTypes` are parsed by the [react-docgen](https://github.com/reactjs/react-docgen) library. Have a look at [their example](https://github.com/reactjs/react-docgen#example) of a component documentation.

### Usage examples

Examples are written in Markdown where any code blocks will be rendered as a react components. By default any `Readme.md` in the component folder is treated as an examples file but you can change it with the `getExampleFilename` option.

```markdown
React component example:

	<Button size="large">Push Me</Button>

Any [Markdown](http://daringfireball.net/projects/markdown/):

* Foo;
* bar;
* baz.
```

## Configuration

You need to configure a bunch of settings in the `styleguide.config.js` file.

### componentsToDocDir

Type: `Array of strings`, required

Your app’s frontend components folders (eg. [`./lib`]). Should not point to a folder with the Styleguidist config and `node_modules` folder. Must be relative to configuration file.

### components

Type: `String`, required

- String: a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that matches all your component modules. Relative to the `componentsToDocDir`.
- Function: function that returns an array of modules.

If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js`:

```javascript
components: './components/**/*.js',
```

If your components look like `components/Button/Button.js` + `components/Button/index.js`:

```javascript
components: function(config, glob) {
	return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
		return /\/[A-Z][a-z]*\.js$/.test(module);
	});
},
```

### getExampleFilename

Type: `Function`, default: finds `Readme.md` in the component folder

Function that returns examples file path for a given component path.

For example, instead of `Readme.md` you can use `ComponentName.examples.md`:

```javascript
getExampleFilename: function(componentpath) {
	return componentpath.replace(/\.jsx?$/, '.examples.md');
}
```


### Config example

```javascript
module.exports = {
	componentsToDocDir: './example',
	components: './**/*.js',
	getExampleFilename: function(componentpath) {
		return componentpath.replace(/\.js$/, '.examples.md');
	}
};
```

## License

The MIT License, see the included [License.md](License.md) file.

# React Styleguidist :skull: work in progress :skull:

[![Build Status](https://travis-ci.org/sapegin/react-styleguidist.svg)](https://travis-ci.org/sapegin/react-styleguidist)

React components style guide generator with a hot reloaded (style guide) dev server.

[Example style guide](http://sapegin.github.io/react-styleguidist/).

![](https://s3.amazonaws.com/f.cl.ly/items/3i0E1D1L1c1m1s2G1d0y/Screen%20Recording%202015-09-24%20at%2009.49%20AM.gif)

## Installation

```
npm install --save-dev react-styleguidist
```

Copy the example project into your projects root. Edit the `styleguide.config.js` to point to your components.

```javascript
module.exports = {
	componentsToDocDirectory: '../lib',
	rootDir:	'./src'
	components: './components/**/*.js'
};
```

See Configuration section below for the list of available options.

Add these scripts to your `package.json`:

```json
"scripts": {
  "styleguide-server": "styleguidist server",
  "styleguide-build": "styleguidist build"
},
```

And run `npm run styleguide-server` to start styleguide dev server.

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

You can change some settings in the `styleguide.config.js` file.

### componentsToDocDir

Type: `String`, required

Your app’s frontend components folder (eg. `./lib`). Should not point to a folder with the Styleguidist config and `node_modules` folder. Must be relative to configuration file.

## rootDir

Type: `String`, required

This directory is used to render the styleguide. Also relative to configuration file.


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

### styleguideDir

Type: `String`, default: `styleguide`

Folder for static HTML style guide generated with `styleguidist build` command.

### template

Type: `String`, default: [src/templates/index.html](src/templates/index.html)

HTML file to use as the template for the output.

### title

Type: `String`, default: `Style guide`

Style guide title.

### serverHost

Type: `String`, default: `localhost`

Dev server host name.

### serverPort

Type: `Number`, default: `3000`

Dev server port.

### highlightTheme

Type: `String`, default: `base16-light`

[CodeMirror theme](http://codemirror.net/demo/theme.html) name to use for syntax highlighting in examples.

### getExampleFilename

Type: `Function`, default: finds `Readme.md` in the component folder

Function that returns examples file path for a given component path.

For example, instead of `Readme.md` you can use `ComponentName.examples.md`:

```javascript
getExampleFilename: function(componentpath) {
	return componentpath.replace(/\.jsx?$/, '.examples.md');
}
```

### updateWebpackConfig

Type: `Function`, optional

Function that allows you to modify Webpack config for style guide:

```javascript
updateWebpackConfig: function(webpackConfig, env) {
	if (env === 'development') {
		/* ... modify config ... */
	}
	return webpackConfig;
}
```

### Config example

```javascript
module.exports = {
	title: 'Style guide example',
	componentsToDocDir: './example',
	components: './**/*.js',
	getExampleFilename: function(componentpath) {
		return componentpath.replace(/\.js$/, '.examples.md');
	}
};
```

## CLI commands and options

### styleguidist server

Run dev server.

### styleguidist build

Generate a static HTML style guide.

### Options

#### --config

Specify path to a config file: `styleguidist server --config dir/styleguide.config.js`.

#### --verbose

Print debug information.

## Changelog

The changelog can be found in the [Changelog.md](Changelog.md) file.

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Author

* [Artem Sapegin](http://sapegin.me)

---

## License

The MIT License, see the included [License.md](License.md) file.

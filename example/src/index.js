import React from 'react';
import StyleGuide  from 'components/StyleGuide';

import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { title, components, highlightTheme } = require('styleguide!');

function setComponentsNames(components) {
	components.map(function(component) {
		var module = component.module;
		component.name = module.displayName || module.name;
		if (!component.name) {
			throw Error('Cannot detect component name for ' + component.filepath);
		}
	});
	return components;
}

function globalizeComponents(components) {
	components.map(function(component) {
		global[component.name] = component.module;
	});
}

console.log(components);

components = setComponentsNames(components);
globalizeComponents(components);

React.render(<StyleGuide title={title} highlightTheme={highlightTheme} components={components}/>, document.getElementById('app'));

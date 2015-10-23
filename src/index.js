import React from 'react';
import { setComponentsNames, globalizeComponents } from './utils/utils';
//var StyleGuide = require('components/StyleGuide');

import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { title, components, highlightTheme, baseComponent } = require('styleguide!');


components = setComponentsNames(components);
globalizeComponents(components);


console.log("=====");
console.log(baseComponent);
React.render(<baseComponent.module title={title} highlightTheme={highlightTheme} components={components}/>, document.getElementById('app'));

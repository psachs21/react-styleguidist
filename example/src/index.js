import React from 'react';
import { Utils } from 'react-styleguidist';
import StyleGuide  from 'components/StyleGuide';

import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { title, components, highlightTheme } = require('styleguide!');


components = Utils.setComponentsNames(components);
Utils.globalizeComponents(components);

React.render(<StyleGuide title={title} highlightTheme={highlightTheme} components={components}/>, document.getElementById('app'));

import React from 'react';
import StyleGuide  from 'components/StyleGuide';
import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { title, components, highlightTheme } = require('styleguide!');

React.render(<StyleGuide title={title} highlightTheme={highlightTheme} components={components}/>, document.getElementById('app'));

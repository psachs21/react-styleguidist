import { Component, PropTypes } from 'react';
import Components from 'components/Components';
import NavBar from 'components/NavBar';
import s from './StyleGuide.css';

export default class StyleGuide extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired
	}

	// TODO: Blank slate

	render() {
		let { title, components, highlightTheme } = this.props;

		return (
			<div className={s.root}>
				<div className={s.nav}>
					<NavBar components={components}/>
				</div>
				<div className={s.content}>
					<div>
						<Components highlightTheme={highlightTheme} components={components}/>
					</div>
				</div>
			</div>
		);
	}
}

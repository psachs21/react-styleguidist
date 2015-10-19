import { Component, PropTypes } from 'react';

export default class NavBar extends Component {
	static propTypes = {
		components: PropTypes.array.isRequired
	}

	renderComponents() {
		let { components } = this.props;

		return components.map((component) => {
			return (
				<div>
          <a href={this._buildLink(component)}>{component.name}</a>
        </div>
			);
		});
	}

  _buildLink(component) {
    return "#"+component.name;
  }

	render() {
		return (
      <div>
  			<div>
  				{this.renderComponents()}
  			</div>
      </div>
		);
	}
}

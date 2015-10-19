import { Component, PropTypes } from 'react';
import SearchFilter from '../SearchFilter';

export default class NavBar extends Component {
	constructor(props){
    super(props);
    this.state = {
      currentFilter: ''
    };
  }

  static propTypes = {
		components: PropTypes.array.isRequired
	}

  onChange = (filter) => {
    console.log('OnChange: '+filter);
    this.setState({
      currentFilter: filter
    });
  }

	renderLinks() {
		let { components } = this.props;
    console.log(this.props);
    console.log(this.state);

		return components.filter((component) => {
      if(this.state.currentFilter != ''){
        return component.name.includes(this.state.currentFilter);
      }
      else{
        return true;
      }
    }).map((component) => {
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
        <SearchFilter components={this.props.components} onChange={this.onChange}/>
  			<div>
  				{this.renderLinks()}
  			</div>
      </div>
		);
	}
}

import { Component, PropTypes } from 'react';

import s from './SearchFilter.css';

export default class SearchFilter extends Component {
  contructor(){
    this.super();
    this.state = {
      filter: ''
    }
  }

	static propTypes = {
		components: PropTypes.array.isRequired,
    onChange:   PropTypes.func.isRequired
	}

  getComponentNames(){
    return this.props.components.map((component) => {
      return component.name;
    });
  }

  _onChange = () => {
    this.props.onChange(event.target.value);
  }

  _onClear = () => {
    this.refs.input.value='';
  }

	render() {
    var clearDiv = null;
    if(this.refs.input.value.length > 0) {
      clearDiv = <div className={s.clear} onClick={this._onClear}>+</div>;
    }
		return (
      <div className={s.inputBox}>
        <input type='text' ref='input' onChange={this._onChange}/>
        {clearDiv}
      </div>
		);
	}
}

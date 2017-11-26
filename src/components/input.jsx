import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChangeInput(value) {
    this.setState({value});
    this.props.onSearchValueChange(value);
  }

  render() {
    return (
      <div className="inputs">
        <input
          value={this.state.value}
          onChange={event => this.handleChangeInput(event.target.value)}/>
      </div>
    )
  }
}

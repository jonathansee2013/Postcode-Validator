import React, { Component } from 'react';

class Input extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event, value) {
    this.setState({ value });
    this.props.onChange(event, value);
  }

  render() {
    return (
      <div>
        <div className="form-title">{this.props.name}</div>
          <input
            className="form-field"
            name={this.props.name}
            type="text"
            value={this.props.value}
            onChange={this.handleInputChange}
            required />
      </div>
    )
  }
}

export default Input;

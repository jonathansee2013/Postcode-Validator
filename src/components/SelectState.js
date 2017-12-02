import React, { Component } from 'react';

class SelectState extends Component {

  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event, value) {
    this.setState({ value });
    this.props.onChange(event, value);
  }

  render() {
    return (
      <div>
        <div className="form-title">State</div>
        <select className="select-field" name="state" type="text"
          value={this.props.value} onChange={this.handleSelectChange}>
          <option value="NSW">NSW</option>
          <option value="QLD">QLD</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
          <option value="VIC">VIC</option>
          <option value="WA">WA</option>
          <option value="NT">NT</option>
          <option value="ACT">ACT</option>
        </select>
      </div>
    )
  }
}

export default SelectState;

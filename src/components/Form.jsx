import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: '',
      suburb: '',
      state: '',
      message: ''
    };
    this.handleChangePostcode = this.handleChangePostcode.bind(this)
    this.handleChangeSuburb = this.handleChangeSuburb.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.postcode + this.state.suburb + this.state.state);
    event.preventDefault();
    // I want to change Submit button to Clear button.
    // Then when Clear button clicked, refresh form.

    let endpoint = 'http://localhost:9999/api?suburb=' + this.state.suburb + '&state=' + this.state.state;

    axios.get(endpoint)
      .then(response => {
        let localitiesArray = response.data.localities.locality;
        console.log("i am array", localitiesArray)
        localitiesArray.forEach((locality, index) => {

          if (Number(this.state.postcode) === locality.postcode && this.state.suburb.toUpperCase() === locality.location && this.state.state === locality.state) {
            console.log("if statement works!")
            this.setState({
              message: "The postcode, suburb and state are valid"
            })
            return
          } else if ((Number(this.state.postcode) !== locality.postcode)){
            this.setState({
              message: `The postcode ${this.state.postcode} does not match suburb ${this.state.suburb}`
            })
            return
          } else if(this.state.state !== locality.state) {
            this.setState({
              message: `The state ${this.state.state} does not match suburb ${this.state.suburb}`
            })
            return
          }
        })
      })
      .catch(error => console.log(error))

  }


  handleChangePostcode(event) {
    this.setState({
      postcode: event.target.value,
    });
  }

  handleChangeSuburb(event) {
    this.setState({
      suburb: event.target.value,
    });
  }

  handleChangeState(event) {
    this.setState({
      state: event.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <form
          className="form-container" onSubmit={this.handleSubmit}>
          <div className="form-title">Postcode</div>
          <input
            className="form-field"
            name="postcode"
            type="text"
            value={this.state.postcode} onChange={this.handleChangePostcode} />

          <div className="form-title">Suburb</div>
          <input
            className="form-field"
            name="suburb"
            type="text"
            value={this.state.suburb}
            onChange={this.handleChangeSuburb} />

          <div className="form-title">State</div>
          <input
            className="form-field"
            name="postcode"
            type="text"
            value={this.state.state} onChange={this.handleChangeState} />

          <div className="submit-container">
            <input
              className="submit-button"
              type="submit"
              value="Submit" />
          </div>
        </form>

        <div className="message-container">
          { this.state.message && <p>{this.state.message}</p>}
        </div>

      </div>
    )
  }
}

import React, { Component } from 'react';
import axios from 'axios';
const api_key = '872608e3-4530-4c6a-a369-052accb03ca8';
const url = 'https://digitalapi.auspost.com.au/postcode/search'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: '',
      suburb: '',
      state: '',
      message: 'The postcode 2000 does not match the suburb Broadway'
    };
    this.handleChangePostcode = this.handleChangePostcode.bind(this)
    this.handleChangeSuburb = this.handleChangeSuburb.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.postcode + this.state.suburb + this.state.state);
    event.preventDefault();

    let endpoint = 'http://localhost:9999/api?suburb=' + this.state.suburb;

    axios.get(endpoint)
    .then(function(response){
      // let localitiesArray = response.data.localities.locality;
      //
      //  if ()
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    });

    // axios.get({
    //   method:'get',
    //   url: url + '.{format}?q=`${this.state.suburb}`&state=`${this.state.state}`',
    //   responseType:'stream'
    // })
    //   .then(res => {
    //    const posts = res.data.data.children.map(obj => obj.data);
    //    this.setState({ posts });
    //  });
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

        <div className="message-container">
          { this.state.message && <p>{this.state.message}</p>}
        </div>

          <div className="submit-container">
            <input
              className="submit-button"
              type="submit"
              value="Submit" />
          </div>
      </form>
      </div>
    )
  }
}

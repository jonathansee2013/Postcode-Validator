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

    event.preventDefault();
    // I want to change Submit button to Clear button.
    // Then when Clear button clicked, refresh form.

    let endpoint = `http://localhost:9999/api?q=${this.state.postcode
      || this.state.suburb}&state=${this.state.state}`;
    let that = this;

    axios.get(endpoint)
    .then( ({ data:{localities} } ) => {
      console.log(localities);
    // .then( response => {
    //   let localities = response.data.localities;

      // initialize two match varialbes for two step check
      let postcodeMatchesSuburb = false;
      let suburbMatchesState = false;

      // helper function to set match variables for single search result
      // if postcodeMatchesSuburb is true, then check  suburbMatchesState
      // if postcodeMatchesSuburb is false, no need to check suburbMatchesState
      const checkSingleLocality = (locality) => {
        let {postcode, location, state} = locality;
        if ( Number(that.state.postcode) === postcode ){  // postcode match
          if (that.state.suburb.toUpperCase() === location) { // postcode matches suburb
            postcodeMatchesSuburb = true;
            if ((that.state.state).toUpperCase()=== state) {  // suburb matches state
              suburbMatchesState = true;
            }
          }
        }
      }

      // helper function to set match variables for multiple search results
      const checkArrayLocality = ( localitiesArray ) => {
        for (let locality of localitiesArray){
          checkSingleLocality(locality);
          if (suburbMatchesState === true) { // early return if all matches
            return
          }
        }
      }

      // helper function to change message state
      const setMessageState = ()=> {
        let message;
        if ( suburbMatchesState ){ // postcode, suburb & state match
          message = 'The postcode, suburb and state entered are valid';
        } else if (postcodeMatchesSuburb) { // postcode & suburb match but NOT suburb & state
          message = `The suburb ${that.state.suburb} does not exist in the state ${that.state.state}`;
        } else { // postcode & suburb do NOT match suburb & state do NOT match
          message = `The postcode ${that.state.postcode} does not match the suburb ${that.state.suburb}`;
        }
        that.setState({ message });
      }

      // if search result empty, early return
      if (! localities ){
        that.setState({
          message: `${that.state.postcode || that.state.suburb} does not exist in the state of ${that.state.state}`
        })
        return;
      }

      // search results not empty, this will set match variables
      if (Array.isArray(localities.locality)) {  // multiple search results
        checkArrayLocality(localities.locality);
      } else { // single search result
        checkSingleLocality(localities.locality);
      }

      // according to match variables, set message state accordingly
      setMessageState();
    })
    .catch( error => {
      if (error.response.data.error){ // response error has errorMessage
        that.setState({message: error.response.data.error.errorMessage});
      } else { // response error does not have errorMessage
        that.setState({message: error.response.data});
      }
    });

  } // handleSubmit



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

          <div className="message-container">
            { this.state.message && <p>{this.state.message}</p>}
          </div>
        </form>


      </div>
    )
  }
}

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

    let endpoint = `http://localhost:9999/api?q=${this.state.postcode || this.state.suburb}&state=${this.state.state}`;
    let that = this;

    axios.get(endpoint)
      .then( ({ data:{localities} } ) => {
        // initialize match state variables
        let postcodeMatchesState = false;
        let suburbMatchesState = false;

        if ( localities ){ // search result not empty
          if (Array.isArray(localities.locality)) {
            console.log(localities.locality)
            // search result is an Array
            that.setState({
              message: `The suburb ${that.state.suburb} exists in ${localities.locality.map( result => {
                return (result.category === "Post Office Boxes")? '': result.state

              } )}`
            });
          } else { // single search result, not an array
            if (that.state.state.toUpperCase() === localities.locality.state) {
              // state match
              if (Number(that.state.postcode) === localities.locality.postcode) {
                // postcode also match
                that.setState({
                  message: "The postcode, suburb and state are valid"
                })
              } else { // state match but postcode not
                that.setState({
                  message: `The postcode ${that.state.postcode} does not match ${that.state.suburb} (${localities.locality.postcode})`
                });
              }
            } else { // state not match
              that.setState({
                message: `The suburb ${that.state.suburb} does not exist in ${that.state.state}`
              })
            }
          }
        } else { // search result empty
          that.setState({
            message: `The suburb ${that.state.suburb} does not exist in ${that.state.state}`
          })
        }

      })


/* =========== using forEach ==============

        let localitiesArray = response.data.localities.locality;
        console.log("i am array", localitiesArray)

        localitiesArray.forEach((locality, index) => {

          if (Number(that.state.postcode) === locality.postcode && that.state.suburb.toUpperCase() === locality.location && that.state.state.toUpperCase() === locality.state) {
            console.log("if statement works!")
            that.setState({
              message: "The postcode, suburb and state are valid"
            })
            return
          } else if ((Number(that.state.postcode) !== locality.postcode)){
            that.setState({
              message: `The postcode ${that.state.postcode} does not match suburb ${that.state.suburb}`
            })
            return
          } else if(that.state.state !== locality.state) {
            that.setState({
              message: `The state ${that.state.state} does not match suburb ${that.state.suburb}`
            })
            return
          }
        })

      })

      */
      .catch(error => {
       console.log(error);
         that.setState({
           message: error.response.data.error.errorMessage
         })
     });

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

// import React, { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './components/Form';
import registerServiceWorker from './registerServiceWorker';

// class App extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       postcode: ''
//       suburb: ''
//       state: ''
//       message: ''
//     };
//   }
// }

ReactDOM.render(<Form />, document.getElementById('root'));
registerServiceWorker();

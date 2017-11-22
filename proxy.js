var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);

var request = require('request');

console.log('Listening on 0.0.0.0:9999' );
app.listen(9999, '0.0.0.0');

// when express receives a request for ANY url...
app.get('/', function(req,res) {

  // set up a new request to Auspost
  var config = {
    // get the suburb from the URL querystring, to forward on to Auspost
    uri: 'https://digitalapi.auspost.com.au/postcode/search.json?q=' + req.query.suburb,
    method: 'GET',
    headers: {
      "AUTH-KEY": "872608e3-4530-4c6a-a369-052accb03ca8"
    }
  };

  request(config).pipe(res); //make the API request, and forward response back to original request (frontend)

});

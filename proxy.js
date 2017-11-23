var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);

var request = require('request');

// Use Express middleware to add the more generous CORS header
// (but we still need to remove the original header, below)
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

console.log('Listening on 0.0.0.0:9999' );
app.listen(9999, '0.0.0.0');

// when express receives a request for ANY url...
app.get('/api', function(req,res) {

  // set up a new request to Auspost
  var config = {
    // get the suburb and state from the URL querystring, to forward on to Auspost
    uri: 'https://digitalapi.auspost.com.au/postcode/search.json?q=' + req.query.suburb + '&state=' + req.query.state,
    method: 'GET',
    headers: {
      "AUTH-KEY": "872608e3-4530-4c6a-a369-052accb03ca8"
    }
  };

  // Make the API request, and forward response back to original,
  // removing the CORS header along the way
  var newRequest = request(config);

  req.pipe(newRequest)
  .on('response', function(response){
    delete response.headers['access-control-allow-origin'];
  })
  .pipe(res);

});

// server.js

// SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/beer_api')

var Beer = require('./app/models/beer');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// This middleware is used for all requests. Test that it's working by looking at the node server output when making a request.
// You can add authentication here...
router.use(function(req, res, next) {
  console.log("Something is happening");
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the beer api!' });   
});

// more routes for our API will happen here
router.route('/beers')


  // index
  .get(function(req, res) {
    Beer.find().then(function(beers){
      res.json(beers);
    });
  });

  // create
  .post(function(req, res) {
    // code here...
  })


router.route('/beers/:beer_id')

  // show

  // update

  // destroy



router.get("/routes", function(req, res){
  console.log(router.stack);
  res.json(router.stack);
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Beers served on port ' + port);
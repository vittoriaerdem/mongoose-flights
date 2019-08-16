
var Flight = require('../models/flights');

module.exports = {
  index,
  show,
  new: newFlight,
  create
};

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', { title: 'All Flights', flights });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/show', { title: 'Flight Details', flight });
  });
}

function newFlight(req, res) {
  res.render('flights/new', { title: 'Add Flight' });
}

function create(req, res) {
  var flight = new Flight(req.body);
  flight.save(function(err) {
    // one way to handle errors
    if (err) return res.redirect('/flights');
    console.log(flight);
    // for now, redirect right back to new.ejs
    res.redirect('/flights');
  });
}
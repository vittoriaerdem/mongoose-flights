
var Flight = require('../models/flight');
var Destinations = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  index,
  show,
  new: newFlight,
  create
};

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', { title: 'All Flights', flights});
  });
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destination').exec(function(err, flight) {
    Ticket.find({_id: {$nin: flight.destination}})
    Destinations.find({_id: {$nin: flight.destination}})
    .exec(function(err, tickets) {
      // console.log(tickets);
      res.render('flights/show', {
        title: 'Flight Details', flight, tickets
      });
    });
  });
}

function newFlight(req, res) {
  res.render('flights/new', { title: 'Add Flight' });
}

function create(req, res) {
  var flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) return res.redirect('/flights');
    res.redirect('/flights');
  });
}

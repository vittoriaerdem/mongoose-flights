var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create,
  addToFlight
};

function addToFlight(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.cast.push(req.body.ticketId);
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`);
    });
  });
}


function create(req, res) {
  req.body.flight = req.params.id;
  Ticket.create(req.body, function (err, tickets) {  
    var newTicket = new Ticket(req.body);
    newTicket.save(function(err, result) {
        res.redirect(`/tickets/new`);
    })
  });
}

function newTicket(req, res) {
  Flight.find({}, function (err, performers) {
    res.render('tickets/new', {
      title: 'Add Ticket', tickets});
  })
}


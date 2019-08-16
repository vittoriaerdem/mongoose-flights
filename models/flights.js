var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
  airport: String,
  arrival: Date,
},{
  timestamps: true
});

var flightSchema = new Schema({
  airline: String,
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
    },
  departs: String,
  airport: [destinationSchema]
},{
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
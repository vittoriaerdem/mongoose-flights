var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SEA']
  },
  arrival: {
    type: Date
  }
});

var flightSchema = new Schema({
  airline: {
    type: String,
    required: true,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
      type: String,
      enum: ['AUS', 'DAL', 'LAX', 'SEA'],
      default: 'SEA'
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function () {
      var date = new Date();
      date.setFullYear(date.getFullYear() + 1)
      return date.toLocaleDateString();}
  },
  destination: [destinationSchema]
},{
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
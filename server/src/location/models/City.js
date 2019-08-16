const mongoose = require('mongoose');
const PolygonSchema = require('./Polygon');

var Schema = mongoose.Schema;

const CitySchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    ref: 'state',
    required: false
  },
  country: {
    type: String,
    ref: 'country',
    required: true
  },
  location: PolygonSchema
});

module.exports = User = mongoose.model('city', CitySchema);

const mongoose = require('mongoose');
const PolygonSchema = require('./Polygon');

var Schema = mongoose.Schema;

const StateSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    ref: 'country',
    required: true
  },
  location: PolygonSchema
});

module.exports = User = mongoose.model('state', StateSchema);

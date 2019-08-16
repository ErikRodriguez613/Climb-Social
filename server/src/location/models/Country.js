const mongoose = require('mongoose');
const PolygonSchema = require('./Polygon');

var Schema = mongoose.Schema;

const CountrySchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: PolygonSchema
});

module.exports = User = mongoose.model('country', CountrySchema);

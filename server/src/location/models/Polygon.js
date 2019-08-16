const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const PolygonSchema = new Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true
  }
});

module.exports = Polygon = mongoose.model('polygon', PolygonSchema);
module.exports = PolygonSchema;

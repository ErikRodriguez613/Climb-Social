const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  city: {
    type: String,
    ref: 'city',
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);

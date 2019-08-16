const bcrypt = require('bcryptjs');
const User = require('../models/User');
const location = require('../../location/implementation/location');

var methods = {
  userExists: async function(email) {
    let user = await User.findOne({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  },
  createUser: async function(
    firstName,
    lastName,
    email,
    password,
    city,
    state,
    country
  ) {
    user = new User({
      firstName,
      lastName,
      email,
      password,
      city
    });
    //hash password
    user.password = await hashPassword(password);
    user.city = await location.getCityId(city, state, country);
    await user.save();
  }
};

module.exports = methods;

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
}

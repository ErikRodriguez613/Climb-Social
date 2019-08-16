const City = require('../models/City');
const Country = require('../models/Country');
const State = require('../models/State');
const Polygon = require('../models/Polygon');

var methods = {
  getCityId: async function(cityName, stateName, countryName) {
    var id = cityName + stateName + countryName;
    let city = await City.findOne({ id });
    if (city) {
      user.city = city;
    } else {
      city = createCity(cityName, stateName, countryName);
    }
    return city.id;
  }
};

module.exports = methods;

async function createCity(cityName, stateName, countryName) {
  var id = cityName + stateName + countryName;
  console.log('city not found, creating a new one: ' + id);
  let state = await State.findOne({ id });
  if (!state) {
    state = await createState(stateName, countryName);
  }
  //get city coordinates
  var city = new City({
    id,
    name: cityName,
    state: state.id,
    country: state.country,
    location: {
      type: 'Polygon',
      coordinates: [[[]]]
    }
  });
  await city.save();
  console.log('created city');
  return city;
}

async function createState(stateName, countryName) {
  var id = stateName + countryName;
  console.log('state not found, creating a new one: ' + id);
  let country = await Country.findOne({ id });
  if (!country) {
    country = await createCountry(countryName);
  }
  //get state coordinates
  var state = new State({
    id,
    name: stateName,
    country: country.id,
    location: {
      type: 'Polygon',
      coordinates: [[[]]]
    }
  });
  await state.save();
  console.log('created state');
  return state;
}

async function createCountry(countryName) {
  console.log('country not found, creating a new one: ' + countryName);
  //get coordinates
  var country = new Country({
    id: countryName,
    name: countryName,
    location: {
      type: 'Polygon',
      coordinates: [[[]]]
    }
  });
  await country.save();
  console.log('created country');
  return country;
}

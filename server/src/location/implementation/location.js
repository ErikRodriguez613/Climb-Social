const City = require('../models/City');
const Country = require('../models/Country');
const State = require('../models/State');
const Polygon = require('../models/Polygon');
const openStreetMaps = require('../implementation/openStreetMap');

var methods = {
  getCityId: async function(cityName, stateName, countryName) {
    var id = cityName + stateName + countryName;
    let city = await City.findOne({ id });
    if (!city) {
      city = createCity(cityName, stateName, countryName);
    }
    return id;
  }
};

module.exports = methods;

async function createCity(cityName, stateName, countryName) {
  var id = cityName + stateName + countryName;
  console.log('city not found, creating a new one: ' + id);
  let state = await State.findOne({ id: stateName + countryName });
  if (!state) {
    state = await createState(stateName, countryName);
  }
  var coordinates = await openStreetMaps.getCity(
    cityName,
    stateName,
    countryName
  );
  var city = new City({
    id,
    name: cityName,
    state: state.id,
    country: state.country,
    location: {
      type: 'Polygon',
      coordinates: coordinates
    }
  });
  await city.save();
  console.log('created city');
  return city;
}

async function createState(stateName, countryName) {
  var id = stateName + countryName;
  console.log('state not found, creating a new one: ' + id);
  let country = await Country.findOne({ id: countryName });
  if (!country) {
    country = await createCountry(countryName);
  }
  var coordinates = await openStreetMaps.getState(stateName, countryName);
  var state = new State({
    id,
    name: stateName,
    country: country.id,
    location: {
      type: 'Polygon',
      coordinates: coordinates
    }
  });
  await state.save();
  console.log('created state');
  return state;
}

async function createCountry(countryName) {
  console.log('country not found, creating a new one: ' + countryName);
  var coordinates = await openStreetMaps.getCountry(countryName);
  var country = new Country({
    id: countryName,
    name: countryName,
    location: {
      type: 'Polygon',
      coordinates: coordinates
    }
  });
  await country.save();
  console.log('created country');
  return country;
}

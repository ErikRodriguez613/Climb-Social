const redisAxios = require('../../utils/redisAxios');

var methods = {
  getCity: async function(city, state, country) {
    let clientKey = `city:${city}${state}${country}`;
    let url = `https://nominatim.openstreetmap.org/search.php?city=${city}&state=${state}&country=${country}&polygon_geojson=1&format=json`;
    var data = await redisAxios.getData(url, clientKey);
    return getCoordinates(data, url);
  },
  getState: async function(state, country) {
    let clientKey = `state:${state}${country}`;
    let url = `https://nominatim.openstreetmap.org/search.php?state=${state}&country=${country}&polygon_geojson=1&format=json`;
    var data = await redisAxios.getData(url, clientKey);
    return getCoordinates(data, url);
  },
  getCountry: async function(country) {
    let clientKey = `country:${country}`;
    let url = `https://nominatim.openstreetmap.org/search.php?country=${country}&polygon_geojson=1&format=json`;
    var data = await redisAxios.getData(url, clientKey);
    return getCoordinates(data, url);
  }
};

module.exports = methods;

function getCoordinates(data, url) {
  if (Array.isArray(data)) {
    if (data.length == 0) {
      console.error(`${url} returned no data`);
    } else {
      coordinates = data[0].geojson.coordinates;
      return coordinates;
    }
  } else {
    console.error(`Failed to get data from ${url}`);
  }
}

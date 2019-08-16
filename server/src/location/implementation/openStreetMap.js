const axios = require('axios');

var methods = {
  getCity: async function(city, state, country) {
    return axios
      .get(
        'https://nominatim.openstreetmap.org/search.php?city=' +
          city +
          '&state=' +
          state +
          '&country=' +
          country +
          '&polygon_geojson=1&format=json'
      )
      .then(response => {
        coordinates = response.data[0].geojson.coordinates;
        console.log(coordinates);
        return coordinates;
      })
      .catch(error => {
        console.error(error);
      });
  },
  getState: async function(state, country) {
    return axios
      .get(
        'https://nominatim.openstreetmap.org/search.php?state=' +
          state +
          '&country=' +
          country +
          '&polygon_geojson=1&format=json'
      )
      .then(response => {
        coordinates = response.data[0].geojson.coordinates;
        console.log(coordinates);
        return coordinates;
      })
      .catch(error => {
        console.error(error);
      });
  },
  getCountry: async function(country) {
    return axios
      .get(
        'https://nominatim.openstreetmap.org/search.php?country=' +
          country +
          '&polygon_geojson=1&format=json'
      )
      .then(response => {
        coordinates = response.data[0].geojson.coordinates;
        console.log(coordinates);
        return coordinates;
      })
      .catch(error => {
        console.error(error);
      });
  }
};

module.exports = methods;

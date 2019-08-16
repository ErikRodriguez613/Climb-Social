const axios = require('axios');
const cache = require('../../config/cache');

const redisClient = cache.createClient();

redisClient.on('connect', () => console.log('Successfully connected to redis'));

redisClient.on('error', function(err) {
  console.log(`Error: ${err} `);
});

var methods = {
  getCity: async function(city, state, country) {
    let clientKey = `city:${city}${state}${country}`;
    let url = `https://nominatim.openstreetmap.org/search.php?city=${city}&state=${state}&country=${country}&polygon_geojson=1&format=json`;
    let response = await getDataFromUrlOrRedis(url, clientKey);
    return getCoordinates(response);
  },
  getState: async function(state, country) {
    let clientKey = `state:${state}${country}`;
    let url = `https://nominatim.openstreetmap.org/search.php?state=${state}&country=${country}&polygon_geojson=1&format=json`;
    let response = await getDataFromUrlOrRedis(url, clientKey);
    return getCoordinates(response);
  },
  getCountry: async function(country) {
    let clientKey = `country:${country}`;
    let url = `https://nominatim.openstreetmap.org/search.php?country=${country}&polygon_geojson=1&format=json`;
    let response = await getDataFromUrlOrRedis(url, clientKey);
    console.log(response);
    return getCoordinates(response);
  }
};

module.exports = methods;

function getCoordinates(data) {
  if (Array.isArray(data)) {
    if (data.length == 0) {
      console.error('nominatim.openstreetmap.org returned no data');
    } else {
      coordinates = data[0].geojson.coordinates;
      return coordinates;
    }
  } else {
    console.error('Failed to get data from nominatim.openstreetmap.org');
  }
}

async function getDataFromUrlOrRedis(url, clientKey) {
  let keyword = clientKey.split(':')[0];
  redisClient.get(clientKey, (error, result) => {
    if (result) {
      console.log(`found ${keyword} in Redis`);
      return JSON.parse(result);
    } else {
      console.log(
        `${keyword} is not in redis, going to ${url} to get coordinates`
      );
      return axios
        .get(url)
        .then(response => {
          if (response) {
            redisClient.set(clientKey, JSON.stringify(response.data));
            return response.data;
          } else {
            console.error(`${url} returned an undefined response`);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  });
}

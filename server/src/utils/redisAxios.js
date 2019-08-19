const axios = require('axios');
const cache = require('../config/cache');
const { promisify } = require('util');

const redisClient = cache.createClient();

redisClient.on('connect', () => console.log('Successfully connected to redis'));

redisClient.on('error', function(err) {
  console.log(`Error: ${err} `);
});

var methods = {
  getData: async function(url, clientKey) {
    try {
      let keyword = clientKey.split(':')[0];
      const getAsync = promisify(redisClient.get).bind(redisClient);
      const setAsync = promisify(redisClient.set).bind(redisClient);
      const result = await getAsync(clientKey);
      if (result) {
        console.log(`found ${keyword} in Redis`);
        return JSON.parse(result);
      } else {
        console.log(
          `${keyword} is not in redis, going to ${url} to get coordinates`
        );
        let responsePromise = axios(url);
        let response = await Promise.resolve(responsePromise);
        if (response.data) {
          await setAsync(clientKey, JSON.stringify(response.data));
          return response.data;
        } else {
          console.error(`${url} returned an undefined response`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = methods;

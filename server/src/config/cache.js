const redis = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://cache';
// Function to connect to the database
var cache = {
  createClient: function() {
    return redis.createClient(process.env.REDIS_URL);
  }
};

module.exports = cache;

const express = require('express');
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

// Options to pass to mongodb to avoid deprecation warnings
const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};
var db = {
  // Function to connect to the database
  conn: async function() {
    try {
      await mongoose.connect(mongoUri, options);
      console.log('MongoDb Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
};

module.exports = db;

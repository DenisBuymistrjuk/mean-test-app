'use strict';

// "export NODE_ENV=development" in cli, where "development" - env name;
var env = process.env.NODE_ENV || 'development';

// check for actual environment
if (-1 === ['production', 'development', 'staging', 'testing'].indexOf(env)) {
  throw new Error('Unknown environment');
}

module.exports = {
  // generic
  host     : process.env.IP || '0.0.0.0',
  port     : process.env.PORT || 9119,
  secret   : process.env.SECRET || 11111,
  publicURL: 'localhost',

  // API
  apiVersion: 1,
  apiTokenLifeTime: 5 * 60 * 1000,

  // MongoDB conf
  mongo: require('./' + env + '/mongo.js')
};

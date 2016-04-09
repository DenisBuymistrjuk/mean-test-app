'use strict';

module.exports = {
  host  : 'localhost',
  port  : 27017,
  db    : 'mean-app',
  getUri: function () {
    return 'mongodb://' + this.host + ':' + this.port + '/' + this.db
  }
};


'use strict';
// some test
var express    = require('express'),
    bodyParser = require('body-parser'),
    config     = require('./app/config'),
    mongoose   = require('mongoose'),
    db         = mongoose.connect(config.mongo.getUri(), config.mongo.options),
    app        = express(),
    router     = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mongo connection
db.connection.on('error', function (err) {
  console.error('MongoDB: connection error: %s', err.message);
});
db.connection.once('open', function () {
  console.info('MongoDB: connected to "%s"', db.connection.name);
});

require('./app/routes')(router, app);

app.listen(config.port, config.host, function () {
	console.info('Express server listening on %s:%d, in mode: %s', config.host, config.port, app.get('env'));
});


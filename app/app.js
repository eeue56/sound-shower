
/**
 * Module dependencies
 */

var express = require('express'),
  http = require('http'),
  path = require('path'),
  routes = require('./routes'),

  db = require('./routes/db'),
  api = require('./routes/api'),
  device = require('./routes/device'),
  session = require('./routes/session');
 
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var config = require('./config.json');

/**
 * Configuration
 */

// all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};

/**
 * Routes
 */

// serve index and view partials
// 
app.get('/', routes.client);
app.get('/admin', routes.admin);
app.get('/partials/:name', routes.partials);
app.get('/play/:name', routes.play);

var shower = require('./routes/shower')(io);


/**
 * Start Server
 */

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

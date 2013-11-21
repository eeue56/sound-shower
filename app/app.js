
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
  session = require('./routes/session'),
  audio = require('./routes/audio');
 
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
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication
//io.sockets.on('connection');

/**
 * Start Server
 */

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

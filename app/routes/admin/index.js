var crawl = require('sound-crawler'),
    Session = require('../session'),
    Device = require('../device');

var sessions = [];

module.exports = function(socket) {

  socket.on('request:devices', function() {
    //var sessionId = socket.get('session');
    console.log('request:devices');
    socket.emit('send:devices', [{
      socket: {},
      id: '#1',
      ip: '174.12.51.23',
      status: 0
    },{
      socket: {},
      id: '#4',
      ip: '121.15.16.28',
      status: 1
    }]);
  });

  socket.on('create:session', function(settings) {
    var session = new Session();
  });

  socket.on('request:tracks', function() {
    var files = crawl('../../audio');
    
    files = files.map(function(name) {
      var lastDot = name.lastIndexOf(".");
      var title = name.substr(0, lastDot);
      var ext = name.substr(lastDot + 1);
      return {
        title: title,
        format: ext
      };
    });

    socket.emit('send:tracks', files);
  });

  socket.emit('send:log', {
    name: "Test",
    message:"Welcome to the server!"
  });

};
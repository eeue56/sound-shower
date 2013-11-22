var crawl = require('sound-crawler'),
    Session = require('../session'),
    Device = require('../device');

module.exports = function(io) {

    var channels = {
        admin: null,
        client: null
    };

    var sessions = {};

    // Socket.io Communication
    channels.admin = io.of('/admin').
    on('connection', function(socket) {

        socket.on('request:tracks', function() {
            socket.emit('send:tracks', getTracks());
        });

        socket.on('switch:session', function(id) {
            id = id.trim();

            console.log('switching session', id);
            socket.set('session', id, function() {
                console.log(getDevices(id))
                socket.emit('send:devices', getDevices(id));
            });
        });
        
        socket.on('create:session', createSession);

        socket.emit('send:sessions', getSessions());
    });

    var createSession = function(settings) {
        var session = new Session(settings);
        sessions[session.id] = session;
        bindSession(session);
        channels.admin.emit('new:session', session);
    };

    var getDevices = function(id) {
        console.log(sessions);
        var session = sessions[id];

        if(!session) {
            console.log(id.length);
            throw {
                name:"SessionNotFoundException",
                message:"No session with the id '"+ id +"' could be found."
            };
        } else {
            return session.devices;
        }
    };

    var getTracks = function() {
        var files = crawl('audio');
    
        var tracks = files.map(function(name) {

          var lastDot = name.lastIndexOf(".");
          var title = name.substr(0, lastDot);
          var ext = name.substr(lastDot + 1);
          
          return {
            title: title,
            format: ext
          };
        });

        return tracks;
    };

    var getSessions = function() {
        var sessionArray = [];

        for(var key in sessions) {
            sessionArray.push(sessions[key]);
        }

        return sessionArray;
    };

    var bindSession = function(session) {
        console.log(session);
        if(typeof session.id === "undefined") {
            throw {
                name: "UndefinedSessionIdException",
                message: "Session id was not defined"
            };
        } else {
            console.log("enable connection to /connect/" + session.id);
            io.of('/connect/' + session.id).
            on('connection', function(socket) {
                var session = sessions[session.id];
                session.addDevice(socket);
            });
        }
    };

};
var crawl = require('sound-crawler'),
    Session = require('../session'),
    Device = require('../device');

module.exports = function(io) {

    var channels = {
        admin: null,
        client: null
    };

    var sessions = {};

    var init = function() {

        // Socket.io Communication
        channels.admin = io.of('/admin').
        on('connection', function(socket) {

            socket.on('request:tracks', function() {
                socket.emit('send:tracks', getTracks());
            });

            socket.on('switch:session', function(id) {
                id = id.trim();

                console.log('[SET] switching session', id);
                socket.set('session', id, function() {
                    socket.emit('send:devices', getDevices(id));
                });
            });
            
            socket.on('request:devices', function() {
                socket.get('session', function(err, id) {
                    if(err) throw err;
                    var devices = [];

                    if(typeof id !== "undefined") {
                        // there is a session, attempt to get devices
                        devices = getDevices(id);           
                    }

                    socket.emit('send:devices', devices);
                });
            });

            socket.on('create:session', createSession);

            socket.on('start:stream', function(opts) {
                var id = opts.id;
                var audio = opts.audio;

                socket.get('session', function(err, sessionId) {
                    if(err) throw err;
                    var devices = [];

                    if(typeof id !== "undefined") {
                        devices = sessions[sessionId].devices;        
                    }

                    for(var i = 0; i < devices.length; i++) {
                        console.log(devices[i].id, "===", id);
                        if(devices[i].id == id) {
                            console.log(devices[i]);
                            devices[i].emit('send:stream', audio);
                        }
                    }
                });
            });

            socket.emit('send:sessions', getSessions());
        });


        createSession({
            id: 'global',
            name: 'global'
        });
    };

    var startStream = function(opts) {

    };

    var createSession = function(settings) {
        var session = new Session(settings);
        sessions[session.id] = session;
        bindSession(session);
        channels.admin.emit('new:session', session);
    };

    var getDevices = function(id) {
        var session = sessions[id];

        if(!session) {
            return [];
            throw {
                name:"SessionNotFoundException",
                message:"No session with the id '"+ id +"' could be found."
            };
        } else {
            return session.devices.map(function(device) {
                return {
                    id: device.id,
                    ip: device.ip,
                    status: device.status
                };
            });
        }
    };

    var getTracks = function() {

        var files = crawl('/home/dan/dev/SoundShower/sound-shower/app/audio');
    
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
            var session = sessions[key];
            sessionArray.push({
                id: session.id,
                name: session.name
            });
        }

        return sessionArray;
    };

    var bindSession = function(session) {
        if(typeof session.id === "undefined") {
            throw {
                name: "UndefinedSessionIdException",
                message: "Session id was not defined"
            };
        } else {
            io.of('/connect/' + session.id).
            on('connection', function(socket) {
                console.log('\n\n\nWe got a connection!!!\n\n\n');

                var device = new Device(socket);
                sessions[session.id].addDevice(device);

                socket.emit('ready?');

                socket.on('disconnect', function () {
                    sessions[session.id].removeDevice(device.id);

                    io.sockets.clients('admin').forEach(function(socket) {
                        
                        (function(socket) {
                            socket.get('session', function(err, id) {
                                if(err) throw err;
                                
                                socket.emit('send:devices', getDevices(id));
                            });
                        })(socket);
                    });

                });

                socket.on('ready', function() {
                    io.sockets.clients('admin').forEach(function(socket) {
                    
                        (function(socket) {
                            device.status = 1;
                            socket.get('session', function(err, id) {
                                if(err) throw err;

                                console.log(id, "===", session.id, id === session.id);
                                if(id === session.id) {
                                    console.log('device ready');
                                    socket.emit('update:device', device);
                                }
                            });
                        })(socket);
                    });                                            
                });

                io.sockets.clients('admin').forEach(function(socket) {
                    
                    (function(socket) {
                        socket.get('session', function(err, id) {
                            if(err) throw err;

                            console.log(id, "===", session.id, id === session.id);
                            if(id === session.id) {
                                console.log('send device');
                                socket.emit('send:devices', device);
                            }
                        });
                    })(socket);
                });

            });


        }
    };


    init();
};
'use strict';

/* Controllers */

angular.module('app.controllers', []).
  
  /**
   * Device Controller
   * Manages the device view page 
   */
  controller('DevicesController', function($scope, socket, settings, events) {
    
    $scope.devices = [];
    $scope.loading = true;
    
    $scope.streamAll = function() {
      for(var i = 0; i < devices.length; i++) {
        $scope.stream(i);
      }
    };

    $scope.stream = function(idx) {
      var track = settings.get('audio');

      console.log('track', track);
      if(track === null || typeof track === 'undefined') {
        events.error({
          name: "No track selected.",
          message: "No track was selected!"
        });
        return;
      }

      socket.emit('start:stream', {
        id: $scope.devices[idx].id, 
        audio: settings.get('audio')
      });

      events.log({
        name: 'Starting stream',
        message: 'Streaming ' + settings.get('audio') + ' to ' + $scope.devices[idx].id
      });
    };

    socket.on('test', function() {
      alert('test');
    });

    socket.on('send:devices', function(devices) {
      console.log("Devices are here");
      $scope.loading = false;
      $scope.devices = devices;
    });

    socket.on('update:device', function(id, status) {
      // update device with this id
      for(var i = 0; i < $scope.devices.length; i++) {
        if($scope.devices[id] === id) {
          $scope.devices[id].status = status;
          break;
        }
      }
    });

    socket.on('send:device', function(device) {
      console.log('new device');
      $scope.devices.push(device);
    });

    socket.emit('request:devices');
  }).

  controller('AudioController', function($scope, socket, settings, events) {
    $scope.tracks = [];
    $scope.search = "";
    $scope.loading = true;

    $scope.selectTrack = function(idx) {
      events.log({
        name: "track select",
        message: "Selected track: " + idx
      });

      var track = $scope.tracks[idx];
      settings.set('audio', track.title);
    };

    socket.on('send:tracks', function(tracks) {
      console.log(tracks)
      $scope.tracks = tracks;
      $scope.loading = false;
    });

    console.log("request tracks");
    socket.emit("request:tracks");
  }).

  controller('StateController', function($scope, settings, events, socket) {
      $scope.session = null;
      $scope.audio = "...";
      $scope.sessions = [];

      settings.subscribe('audio', function(audio) {
        console.log("Controller");
        $scope.audio = audio;
      });

      socket.on('send:sessions', function(sessions) {
        console.log('Here come sessions');
        console.log(sessions);
        $scope.sessions = sessions;
        if(sessions.length > 0) {
          $scope.session = sessions[0].id;
          $scope.selectSession();
        }
      });

      socket.on('new:session', function(session) {
        console.log('New session');
        console.log(session);
        $scope.sessions.push(session);
      });

      $scope.selectSession = function() {
        events.log({
          name: "session select",
          message: "Switched to session: " + $scope.session
        });

        settings.set('session', $scope.session);
        socket.emit('switch:session', $scope.session);
      };
  }).

  controller('LogController', function($scope, socket, events) {
      $scope.logs = [];

      events.subscribe(function(log) {
        $scope.add(log);
      });

      socket.on('send:log', function(log) {
        $scope.add(log);
      });

      $scope.add = function(log) {
        $scope.logs.push(log);
      };
  }).

  controller('CreateController', function($scope, socket, events) {
      $scope.name = "";
      $scope.id = "";
      $scope.error = "";
      $scope.success = "";

      $scope.create = function() {
        socket.emit('create:session', {
          name: $scope.name,
          id: $scope.id
        });
        $scope.success = "Session created.";
      };
  });

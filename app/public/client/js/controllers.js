'use strict';

/* Controllers */

angular.module('app.controllers', []).
  
  /**
   * Device Controller
   * Manages the device view page 
   */
  controller('DevicesController', function($scope, socket) {
    
    socket.on('send:stream', function(song) {
      console.log('/play/' + song);
      var audio = new Audio('/play/' + song);
      window.audio = audio;
      audio.addEventListener('load', function() {
        console.log('audio is ready');
      });
      audio.addEventListener('ended', function() {
        console.log('audio has ended');
        socket.emit('end:stream');
      });
      audio.play();
    });

    socket.on('ready?', function() {
      socket.emit('ready');
    });
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
      $scope.state = "Doing nothing";
      $scope.audio = "...";
      $scope.sessions = [];

      settings.subscribe('state', function(state) {
        $scope.state = state;
      });

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

      $scope.create = function() {
        socket.emit('create:session', {
          name: $scope.name,
          id: $scope.id
        });
      };
  });

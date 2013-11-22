'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', []).
  
  provider('socket', function ($rootScope, $timeout) {
    this.session = null;

    this.$get = function() {
        var socket = io.connect("http://localhost:4040/connect:" + session);
        return {
          on: function (eventName, callback) {
            socket.on(eventName, function () {  
              var args = arguments;
              $timeout(function () {
                callback.apply(socket, args);
              }, 0);
            });
          },
          emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                if (callback) {
                  callback.apply(socket, args);
                }
              });
            });
          }
        };
    }

    this.setSession = function(session) {
        this.session = session;
    };
  }).

  factory('errors', function() {

    var errors = [];

    var get = function() {
        return errors;
    };

    var report = function(err, insta) {
        errors.push(err);

        if(insta) {
            display();
        }
    };

    var clean = function() {
        errors.length = 0;
    };

    var display = function() {
        window.location = "#/errors";
    };

    return {
        get: get,
        report: report,
        display: display,
        clean: clean
    }

  });

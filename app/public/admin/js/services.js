'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', []).
  factory('settings', function() {

    var settings = {};
    var subscriptions = {};

    var set = function(key, val) {
        //console.log("Set", key, "to", val);
        
        // set the value
        settings[key] = val;

        var subs = subscriptions[key];
        //console.log("Update subscribers", subs);
        if(typeof subs === "object") {
            for(var i = 0; i < subs.length; i++) {
                if(typeof subs[i] === "function") {
                    subs[i](val);
                }
            }
        }
    };

    var get = function(key) {
        //console.log("Get Setting");
        return settings[key];
    };

    var subscribe = function(key, fn) {
        //console.log("Subscription to", key);
        var subs = subscriptions;
        // register subscription
        if(typeof subs[key] !== "object") {
            subs[key] = [];
        }

        subs[key].push(fn);
    };

    return {
        set: set,
        get: get,
        subscribe: subscribe
    };
  }).

  factory('events', function() {
    var subscriptions = [];

    var log = function(msg) {
      notify("event", msg)
    };

    var error = function(msg) {
      notify("error", msg);
    };

    var notify = function(type, msg) {
      msg.type = type;
      for(var i = 0; i < subscriptions.length; i++) {
            if(typeof subscriptions[i] === "function") {
                subscriptions[i](msg);
            }
        }
    };

    var subscribe = function(fn) {
        subscriptions.push(fn);
    };

    return {
        log: log,
        error: error,
        subscribe: subscribe
    };
  }).

  factory('socket', function($rootScope, $timeout) {
    var socket = io.connect("http://localhost:4040/admin");
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
  });

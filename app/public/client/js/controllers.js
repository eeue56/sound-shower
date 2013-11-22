'use strict';

/* Controllers */

angular.module('app.controllers', []).

controller('ConnectController', function($q, $scope, 
  $routeParams, socket, errors) {
  var defer = $q.defer();
  var id = $routeParams.id;

  if(typeof id === "undefined") {
    errors.report({
      name: "We can't find that session!",
      message: "Please make sure you typed the correct URL." 
    });
  } else {
    socket.setSession(id);
    defer.resolve();
  }

  return defer;
}).

controller('ErrorController', function($scope, errors) {
  $scope.errors = errors.get();
}).

controller('AudioController', function($scope, errors, socket) {

});
'use strict';

// Declare app level module which depends on filters, and services

angular.module('app', [
  'app.controllers',
  'app.filters',
  'app.services',
  'app.directives',

  // 3rd party dependencies
  //'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/connect/:id', {
      controller: 'ConnectController'
    }).
    when('/error', {
      controller: 'ErrorController',
      resolve: {
        connect: 'ConnectController'
      }
    });

  $locationProvider.html5Mode(true);
});

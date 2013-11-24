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
    when('/', {
      templateUrl: '/partials/devices',
      controller: 'DevicesController'
    }).
    when('/audio', {
      templateUrl: '/partials/audio',
      controller: 'AudioController'
    }).
    when('/settings', {
      templateUrl: '/partials/settings',
    }).
    when('/create', {
      templateUrl: '/partials/create',
      controller: 'CreateController'    
    }).
    otherwise({
      redirectTo: '/'
    });
});

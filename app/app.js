'use strict';

// libraries, frameworks, etc.

var angular = require('angular');
require('angular-route');

// views
require('./views/home');
require('./views/alarm');


// Declare app level module which depends on views, and components
angular.module('appAtNight', [
        'ngRoute',
        'appAtNight.home',
        'appAtNight.alarm'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', function($rootScope) {

        // $rootScope.endpointAddr = "http://127.0.0.1:5000/";
        // $rootScope.endpointAddr = "http://87.106.9.22:8081/";
        // $rootScope.endpointAddr = "http://centerventure15.cdtm.de:8081/";
        // $rootScope.endpointAddr = "http://localhost/";
        $rootScope.endpointAddr = "/";
    }])
    .factory('sensors', require('./services/sensors'));


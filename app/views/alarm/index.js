'use strict';

angular.module('appAtNight.alarm', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/alarm/:hours/:minutes/:seconds', {
            templateUrl: 'views/alarm/alarm.html',
            controller: 'AlarmController'
        });
    }])

    .controller('AlarmController', require('./alarm.controller'));
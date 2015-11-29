'use strict';

angular.module('appAtNight.activity', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/activity', {
            templateUrl: 'views/activity/activity.html',
            controller: 'ActivityController'
        });
    }])

    .controller('ActivityController', require('./activity.controller'));
'use strict';

angular.module('appAtNight.header', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {

    }])

    .controller('HeaderController', require('./header.controller'))
    .directive('headerDirective', require('./header.directive'));
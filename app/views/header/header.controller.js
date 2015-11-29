'use strict';

module.exports = ['$scope', '$http', 'sensors', '$location', function($scope, $http, sensors, $location) {


    console.log($http);

    $scope.expanded = $location.url() == '/';
    sensors.init();

    console.log('dummy controller running');


    $scope.alarmPage = function() {
        $location.url('/alarm');
        $scope.expanded = false;
    };

    $scope.activityPage = function() {
        $location.url('/activity');
        $scope.expanded = false;
    };

}];
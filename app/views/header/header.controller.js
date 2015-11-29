'use strict';

module.exports = ['$scope', '$http', 'sensors', '$location', function($scope, $http, sensors, $location) {


    console.log($http);

    sensors.init();

    console.log('dummy controller running');

    $scope.activityPage = function() {
        $location.url('/activity');
        $scope.expanded = false;
    };


}];
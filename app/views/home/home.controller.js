'use strict';

module.exports = ['$scope', '$http', 'sensors', '$location', function($scope, $http, sensors, $location) {

    $scope.temperature = 'n/a';
    $scope.humidity = 'n/a';

    console.log('dummy controller running');

    sensors.init();

    sensors.listen('temperature', function(temp) {
        $scope.temperature = temp;
        $scope.$apply();
    });

    $scope.alarmPage = function() {
        $location.url('/alarm');
    };


}];
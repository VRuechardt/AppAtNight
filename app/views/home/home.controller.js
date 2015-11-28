'use strict';

module.exports = ['$scope', '$http', 'sensors', function($scope, $http, sensors) {

    $scope.temperature = 'n/a';
    $scope.humidity = 'n/a';

    console.log('dummy controller running');

    sensors.init();

    sensors.listen('temperature', function(temp) {
        $scope.temperature = temp;
        $scope.$apply();
    });



}];
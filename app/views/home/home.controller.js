'use strict';

module.exports = ['$scope', '$http', function($scope, $http) {

    $scope.temperature = 'n/a';
    $scope.humidity = 'n/a';

    console.log('dummy controller running');

    relayr.ready = function() {


        relayr.devices().getDeviceData({

            deviceId: "a8f076a5-6145-4d50-acda-03124994abfc",
            incomingData: function(data){
                $scope.temperature = Math.round(data.readings[0].value);
                $scope.humidity = Math.round(data.readings[1].value);
                $scope.$apply();
            }

        });

    };



}];
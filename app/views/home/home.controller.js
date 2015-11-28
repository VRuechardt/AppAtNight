'use strict';

module.exports = ['$scope', '$http', function($scope, $http) {

    $scope.humidity = 'n/a';

    console.log('dummy controller running');

    relayr.ready = function() {


        relayr.devices().getDeviceData({

            deviceId: "a8f076a5-6145-4d50-acda-03124994abfc",
            incomingData: function(data){
                console.log(data.readings[1].value);
                $scope.humidity = data.readings[1].value;
                $scope.$apply();
            }

        });

    };



}];
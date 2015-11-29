'use strict';

module.exports = ['$scope', '$http', 'sensors', '$routeParams', function($scope, $http, sensors, $routeParams) {

    $scope.humidityLimit = 50;
    $scope.humidityReached = false;
    $scope.humidity = 0;

    $scope.hours = $routeParams.hours * 1;
    $scope.minutes = $routeParams.minutes * 1;
    $scope.seconds = $routeParams.seconds * 1;

    console.log(sensors);
    sensors.init();
    sensors.listen('humidity', function(data) {

        $scope.humidity = data;
        $scope.$apply();
        if(!$scope.humidityReached && data > $scope.humidityLimit) {
            $scope.humidityReached = true;
            $scope.light();
        }

    });

    $scope.light = function() {

        responsiveVoice.speak("Had a nice nap? Wake up now. Wake up. Now! Im serious. We have three degree celsius outside.", "Australian Female");
        $scope.animate([
            'white', 'blink', 'blink', 'red', 'blink', 'blink'
        ]);


    };

    $scope.animate = function(colors) {
        colors.forEach(function(o, i) {
            if(o == 'blink') {
                window.setTimeout(function() {

                    $http.post('https://maker.ifttt.com/trigger/wake_blink/with/key/b4edybaXULWGse8LeavHRn')
                        .then(function(response) {
                            console.log(response);
                        }, function(error) {
                            console.log(error);
                        });
                }, i * 2000);
            } else {
                window.setTimeout(function() {

                    $http.post('https://maker.ifttt.com/trigger/wakeup/with/key/b4edybaXULWGse8LeavHRn?value1=' + o)
                        .then(function(response) {
                            console.log(response);
                        }, function(error) {
                            console.log(error);
                        });
                }, i * 2000);
            }

        });
    };


    $scope.alarmRunning = false;
    $scope.countdown = function() {

        $scope.alarmRunning = true;

        var secBackup = $scope.seconds;

        if($scope.seconds > 0) {
            $scope.seconds--;
        } else if($scope.minutes > 0) {
            $scope.minutes--;
            $scope.seconds = 59;
        } else if($scope.hours > 0) {
            $scope.hours--;
            $scope.minutes = 59;
        } else {
            responsiveVoice.speak("Had a nice nap? Wake up now. Wake up. Now! Im serious. We have three degree celsius outside.", "Australian Female");
            $scope.alarmRunning = false;
        }

        if($scope.hours == 0 && $scope.minutes == 0 && $scope.seconds == 1) {
            $scope.animate([
                'white', 'blink', 'blink', 'red', 'blink', 'blink'
            ]);
        }

        if(!$scope.$$phase) {
            $scope.$apply();
        }

        if($scope.hours > 0 || $scope.minutes > 0 || secBackup > 0) {
            window.setTimeout($scope.countdown, 1000);
        }

    };

}];
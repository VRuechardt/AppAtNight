'use strict';

module.exports = ['$scope', '$http', 'sensors', '$routeParams', function($scope, $http, sensors, $routeParams) {

    $scope.humidityLimit = 50;
    $scope.humidityReached = false;
    $scope.humidity = 0;

    $scope.hours = $routeParams.hours * 1;
    $scope.minutes = $routeParams.minutes * 1;
    $scope.seconds = $routeParams.seconds * 1;

    $scope.napAdvisor = 'According to your sleeping cycle you could do a cat nap now. The recommended duration for a quick energy boost is ';
    $scope.napAdvisorTime = ($scope.minutes > 20 ? '90 minutes.' : '20 minutes.');
    if($scope.hours > 5) {
        $scope.napAdvisor = 'You should not go to sleep now, as it will mess up your sleeping cycle.';
        $scope.napAdvisorTime = '';
    }

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

        console.log('counting down');
        $scope.alarmRunning = true;

        var secBackup = $scope.seconds;

        if($scope.seconds > 0) {
            $scope.seconds--;
        } else if($scope.minutes > 0) {
            $scope.minutes--;
            $scope.seconds = 59;
            secBackup = 59;
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

    $scope.timeToFallAsleep = 19;

    $scope.pressureHistory = [];
    $scope.pressureLast = [];
    $scope.pressureAnalyzer = function(step) {
        if($scope.pressureLast.length > 0) {
            $scope.pressureHistory.push($scope.pressureIndex(step, $scope.pressureLast));
            $scope.pressureLast = step;
            if($scope.silentIndex() > $scope.timeToFallAsleep && !$scope.fellAsleep) {
                $scope.fellAsleep = true;
                $scope.countdown();
            } else if(!$scope.fellAsleep) {
                $scope.sleepProbability = Math.floor($scope.silentIndex() / $scope.timeToFallAsleep * 100) + '%';
            }
        } else {
            $scope.pressureLast = step;
        }
    };

    $scope.pressureIndex = function(step, last) {
        var sum = 0;
        for(var i = 0; i < step.length; i++) {
            var change = last[i] - step[i];
            sum += Math.abs(change);
        }
        sum = sum / 8;
        return sum;
    };

    $scope.silentIndex = function() {
        var numSilent = 0;
        var brokenSilence = false;
        for(var i = $scope.pressureHistory.length-1; i >= 0 && !brokenSilence; i--) {
            if($scope.pressureHistory[i] < 0.3) {
                numSilent++;
            } else {
                brokenSilence = true;
            }
        }
        return numSilent;
    };

    $scope.pressureData = [];
    $scope.pressure = function() {
        $http.get('http://141.84.221.173/json/pressure.php')
            .then(function(response) {
                $scope.pressureData = response.data;
                $scope.pressureAnalyzer(response.data);

                for(var i = 0; i < $scope.pressureData.length; i++) {
                    var perc = $scope.pressureData[i] / 100;
                    //perc = 0.2;
                    $('#sensor-' + i).css('background-color', 'rgba(18, 57, 104,'+perc+')');
                }
            });
    };

    $scope.fellAsleep = false;
    $scope.sleepProbability = 0;

    $scope.listenForSleep = function() {
        $scope.alarmRunning = true;
        window.setInterval(function() {
            $scope.pressure();
        }, 1000);
    };


}];
'use strict';

module.exports = ['$scope', '$http', 'sensors', function($scope, $http, sensors) {

    $scope.humidityLimit = 50;
    $scope.humidityReached = false;
    $scope.humidity = 0;

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

}];
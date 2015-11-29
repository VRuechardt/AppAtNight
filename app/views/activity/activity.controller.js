'use strict';

module.exports = ['$scope', '$http', 'sensors', '$location', function($scope, $http, sensors, $location) {

    var data = [];
    for(var i = 0; i < 100; i++) {
        data.push(1 + i);
    }
    data.push('noon');

    $('#chartContainer').highcharts({
        chart: {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        title: {
            text: '',
            y: -20 //center
        },
        xAxis: {
            categories: data
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: 'rgba(122, 122, 122, 0.3)'
            }]
        },
        tooltip: {
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Quality of Sleep',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Oxygen',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Temperature',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }]
    });

    $('#chartContainer2').highcharts({
        chart: {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        title: {
            text: '',
            y: -20 //center
        },
        xAxis: {
            categories: data
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: 'rgba(122, 122, 122, 0.3)'
            }]
        },
        tooltip: {
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Quality of Sleep',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Oxygen',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Temperature',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }]
    });

    $('#chartContainer3').highcharts({
        chart: {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        title: {
            text: '',
            y: -20 //center
        },
        xAxis: {
            categories: data
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: 'rgba(122, 122, 122, 0.3)'
            }]
        },
        tooltip: {
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Quality of Sleep',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Oxygen',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Temperature',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }]
    });

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

    $scope.activity = 'average';
    $scope.accActivity = [];
    sensors.listen('acceleration', function(acc) {
        $scope.activity = acc.x + acc.y + acc.z;
        $scope.accActivity.push(acc.x + acc.y + acc.z);

        var sum = 0;
        $scope.accActivity.forEach(function(o) {
            sum = sum + o;
        });

        sum = sum / $scope.accActivity.length;

        //console.log(sum);
        //console.log($scope.activity);
        if($scope.activity < sum * 0.7) {
            $scope.activity = 'quiet';
        } else if($scope.activity >= sum * 0.7) {
            $scope.activity = 'average';
        } else {
            $scope.activity = 'fun';
        }
        $scope.$apply();
    });

    $scope.pressureHistory = [];
    $scope.pressureLast = [];
    $scope.pressureAnalyzer = function(step) {
        if($scope.pressureLast.length > 0) {
            $scope.pressureHistory.push($scope.pressureIndex(step, $scope.pressureLast));
            $scope.pressureLast = step;
            $('#chartContainer').highcharts({
                chart: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    animation: false
                },
                title: {
                    text: '',
                    y: -20 //center
                },
                xAxis: {
                    categories: data
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: 'rgba(122, 122, 122, 0.3)'
                    }]
                },
                tooltip: {
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Movement',
                    data: $scope.pressureHistory,
                    animation: false
                }]
            });
            console.log($scope.pressureHistory);
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

    $scope.pressureData = [];
    $scope.pressure = function() {
        $http.get('http://localhost/json/pressure.php')
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

    window.setInterval(function() {
        $scope.pressure();
    }, 1000);

}];
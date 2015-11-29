'use strict';

module.exports = ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.expanded = true;
    $scope.alarmPage = function(hours, minutes, seconds) {
        $location.url('/alarm/' + hours + '/' + minutes + '/' + seconds);
        $scope.expanded = false;
    };

}];
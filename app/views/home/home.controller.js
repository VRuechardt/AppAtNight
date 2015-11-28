'use stric';

module.exports = ['$scope', '$http', function($scope, $http) {

    console.log('dummy controller running');

    var relayr = RELAYR.init({
        appId: "bbefb11e-0986-4f89-a3d2-a217b627d5a2",
        redirectUri:"http://localhost:63343/appatnight/app/index.html#/"
    });

    relayr.login({
        success: function(token){
            console.log(token);
            console.log('logged in');
        }
    });

    relayr.devices().getAllDevices(function(devices){
        console.log(devices);
    });

}];
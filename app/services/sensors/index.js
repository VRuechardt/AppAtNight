'use strict';

module.exports = ['$http', function($http) {

    var sensorService = {

        devices: [
            {
                id: "181ce78d-3bec-4090-9c6c-adc99464622a",
                events: [
                    {
                        callbacks: [],
                        name: "microphone"
                    }
                ]
            },
            {
                id: "4908a0c3-0628-48f9-81a5-d3e6bd75b0f8",
                events: [
                    {
                        callbacks: [],
                        name: "light"
                    },
                    {
                        callbacks: [],
                        name: "proximity"
                    },
                    {
                        callbacks: [],
                        name: "color"
                    }
                ]
            },
            {
                id: "a8f076a5-6145-4d50-acda-03124994abfc",
                events: [
                    {
                        callbacks: [],
                        name: "temperature"
                    },
                    {
                        callbacks: [],
                        name: "humidity"
                    }
                ]
            },
            {
                id: "9aab14fe-31d3-4af1-94fb-1a2514172109",
                events: [
                    {
                        callbacks: [],
                        name: "angularSpeed"
                    },
                    {
                        callbacks: [],
                        name: "acceleration"
                    }
                ]
            }
        ],
        notify: function() {
            sensorService.callbacks.forEach(function(o, i) {
                o(accountService.loggedIn);
            });
        },
        init: function() {

            if(!sensorService.initialized) {
                sensorService.initialized = true;
                console.log('initiated');

                relayr.ready = function() {

                    console.log('connected: ');
                    console.log(sensorService);

                    sensorService.connected = true;
                    sensorService.devices.forEach(function(device, d_i) {

                        relayr.devices().getDeviceData({

                            deviceId: device.id,
                            incomingData: function(data){
                                for(var i = 0; i < data.readings.length; i++) {
                                    device.events[i].callbacks.forEach(function(callback, e_i) {
                                        callback(data.readings[i].value);
                                    });
                                }
                            }

                        });

                    });

                };

            }

        },
        connected: false,
        initialized: false,
        listen: function(eventname, callback) {

            sensorService.devices.forEach(function(device, i) {
                device.events.forEach(function(event, j) {
                    if(event.name == eventname) {
                        event.callbacks.push(callback);
                    }
                });
            });

        }

    };

    return sensorService;

}];
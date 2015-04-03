'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.dooraccess', {
                parent: "user",
                url: '/dooraccess/',
                templateUrl: 'user/dooraccess/dooraccess.html',
                resolve: {
                    pin: ['currentUser', 'PinService1', function(currentUser, PinService1) {
                        return PinService1.GetUserPin(currentUser.id).then(function(data) {
                            return data.key.replace("|","");
                        });
                    }]
                },
                controller: ['$scope', 'pin', function($scope, pin) {
                    $scope.pin = pin;
                }]
            });
    }]);
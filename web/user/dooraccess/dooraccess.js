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
                    pin: ['currentUser', '$location', 'PinService1', function(currentUser, $location, PinService1) {
                        return PinService1.GetUserPin(currentUser.id).then(function(data) {
                            if (data.key != null)
                                return data.key.replace("|","");

                            return null;
                        });
                    }]
                },
                controller: ['$scope', 'pin', function($scope, pin) {
                    $scope.pin = pin;
                }]
            });
    }]);
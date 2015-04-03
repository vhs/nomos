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
                    key: ['currentUser', 'PinService1', function(currentUser, PinService1) {
                        return PinService1.GetUserPin(currentUser.id);
                    }]
                },
                controller: ['$scope', 'PinService1', function($scope, PinService1) {

                    $scope.PinService1 = PinService1;
                }]
            });
    }]);
'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.dooraccess', {
                parent: "user",
                url: '/dooraccess/',
                templateUrl: 'user/dooraccess/dooraccess.html',
                controller: ['$scope', function($scope) {

                }]
            });
    }]);
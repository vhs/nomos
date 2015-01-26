'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.vhsopen', {
                parent: "user",
                url: '/vhsopen/',
                templateUrl: 'user/vhsopen/vhsopen.html',
                controller: ['$scope', function($scope) {

                }]
            });
    }]);
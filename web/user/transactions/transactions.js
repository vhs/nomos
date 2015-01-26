'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.transactions', {
                parent: "user",
                url: '/transactions/',
                templateUrl: 'user/transactions/transactions.html',
                controller: ['$scope', function($scope) {

                }]
            });
    }]);
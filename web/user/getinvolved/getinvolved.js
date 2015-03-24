'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.getinvolved', {
                parent: "user",
                url: '/getinvolved/',
                templateUrl: 'user/getinvolved/getinvolved.html',
                controller: ['$scope', function($scope) {

                }]
            });
    }]);
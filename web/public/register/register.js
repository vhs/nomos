'use strict';

angular
    .module('mmpApp.public')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('public.register', {
                parent: "public",
                url: '/register/',
                templateUrl: 'public/register/register.html',
                controller: ['$scope', function($scope) {

                }]
            });
    }]);
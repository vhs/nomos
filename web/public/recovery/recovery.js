'use strict';

angular
    .module('mmpApp.public')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('public.recovery', {
                parent: "public",
                url: '/recovery/',
                templateUrl: 'public/recovery/recovery.html',
                controller: ['$scope', function($scope) {

                }]
            });
    }]);
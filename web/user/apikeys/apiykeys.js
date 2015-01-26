'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.apikeys', {
                parent: "user",
                url: '/apikeys/',
                templateUrl: 'user/apikeys/apikeys.html',
                controller: ['$scope', function($scope) {

                }]
            });
    }]);
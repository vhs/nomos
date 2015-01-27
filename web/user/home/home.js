'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.home', {
                parent: "user",
                url: '/',
                templateUrl: 'user/home/home.html',
                controller: ['$scope', function($scope) {
                    $scope.date = "January 2015";
                }]
            });
    }]);
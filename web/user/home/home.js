'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.home', {
                parent: "user",
                url: '/',
                templateUrl: 'user/home/home.html',
                controller: ['$scope', '$timeout', 'UserService1', function($scope, $timeout, UserService1) {

                    $scope.profile = angular.copy($scope.currentUser);
                }]
            });
    }]);
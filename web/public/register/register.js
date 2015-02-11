'use strict';

angular
    .module('mmpApp.public')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('public.register', {
                parent: "public",
                url: '/register/',
                templateUrl: 'public/register/register.html',
                controller: ['$scope', 'UserService1', function($scope, UserService1) {
                    $scope.register = function() {
                        UserService1.Register($scope.username, $scope.password, $scope.email, $scope.fname, $scope.lname).then(function(data) {
                            alert(JSON.stringify(data));
                        });
                    };
                }]
            });
    }]);
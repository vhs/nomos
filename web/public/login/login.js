'use strict';

angular
    .module('mmpApp.public')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('public.login', {
                parent: "public",
                url: '/login/',
                templateUrl: 'public/login/login.html',
                controller: ['$scope', '$location', 'AuthService1', function($scope, $location, AuthService1) {
                    $scope.error = null;

                    $scope.login = function() {
                        $scope.error = null;
                        AuthService1.Login($scope.username, $scope.password).then(
                            function(response) {
                                if(response == '"Access Granted"')
                                    $location.path("/");
                                else
                                    $scope.error = JSON.parse(response);
                            });
                    };
                }]
            });
    }]);
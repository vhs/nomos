'use strict'

angular.module('mmpApp.public').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('public.login', {
            parent: 'public',
            url: '/login/',
            templateUrl: 'public/login/login.html',
            controller: [
                '$state',
                '$scope',
                '$location',
                'AuthService1',
                function ($state, $scope, _$location, AuthService1) {
                    $scope.error = null

                    $scope.login = function () {
                        $scope.error = null
                        AuthService1.Login($scope.username, $scope.password).then(function (response) {
                            if (response === 'Access Granted') $state.go('user.home')
                            else $scope.error = JSON.parse(response)
                        })
                    }
                }
            ]
        })
    }
])

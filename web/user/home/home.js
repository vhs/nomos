'use strict'

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.home', {
            parent: 'user',
            url: '/',
            templateUrl: 'user/home/home.html',
            resolve: {},
            controller: [
                '$scope',
                '$state',
                function ($scope, $state) {
                    if ($scope.currentUser != null && $scope.currentUser.id != null) $state.go('public.login')

                    $state.go('user.dashboard')
                }
            ]
        })
    }
])

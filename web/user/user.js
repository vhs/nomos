'use strict';

angular.module('mmpApp.user', ['ui.router', 'angular-md5', 'ui.bootstrap']).config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user', {
            abstract: true,
            templateUrl: 'user/user.html',
            data: {
                access: 'user',
            },
            resolve: {
                currentUser: [
                    '$q',
                    'CurrentUser',
                    function ($q, CurrentUser) {
                        return CurrentUser.getCurrentUser();
                    },
                ],
            },
            controller: [
                '$scope',
                '$location',
                'currentUser',
                function ($scope, $location, currentUser) {
                    $scope.loading = true;
                    $scope.currentUser = currentUser;
                },
            ],
        });
    },
]);

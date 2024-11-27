'use strict';

angular.module('mmpApp.public', ['ui.router']).config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('public', {
                abstract: true,
                template: '<ui-view/>',
                data: {
                    access: 'public',
                },
            })
            .state('public.logout', {
                url: '/logout/',
                template: 'Logging out...',
                controller: [
                    '$scope',
                    '$location',
                    'AuthService1',
                    function ($scope, $location, AuthService1) {
                        AuthService1.Logout().then(function () {
                            $location.path('/login/');
                        });
                    },
                ],
            });
    },
]);

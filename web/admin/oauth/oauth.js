'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
            $stateProvider
            .state('admin.oauth', {
                parent: "admin",
                url: '/oauth/',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/oauth/oauth.html',
                controller: ['$scope', '$modal', '$timeout', 'AuthService1', function ($scope, $modal, $timeout, AuthService1) {

                }]
            });
        }]
    );

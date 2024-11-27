'use strict';

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.logs', {
            parent: 'admin',
            url: '/logs/',
            data: {
                access: 'admin',
            },
            templateUrl: 'admin/logs/logs.html',

            controller: [
                '$scope',
                '$modal',
                'logs',
                function ($scope, $modal, logs) {
                    $scope.logs = logs;
                },
            ],
        });
    },
]);

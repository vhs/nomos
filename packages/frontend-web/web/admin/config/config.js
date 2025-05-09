'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.config', {
            parent: 'admin',
            url: '/config/',
            data: {
                access: 'admin'
            },
            templateUrl: 'admin/config/config.html',

            controller: [
                '$scope',
                '$modal',
                'config',
                function ($scope, _$modal, config) {
                    $scope.config = config
                }
            ]
        })
    }
])

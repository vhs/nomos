'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.backup', {
            parent: 'admin',
            url: '/backup/',
            data: {
                access: 'admin'
            },
            templateUrl: 'admin/backup/backup.html',

            controller: [
                '$scope',
                '$modal',
                'backup',
                function ($scope, _$modal, backup) {
                    $scope.backup = backup
                }
            ]
        })
    }
])

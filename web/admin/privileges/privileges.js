'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.privileges', {
                parent: "admin",
                url: '/admin/privileges/',
                templateUrl: 'admin/privileges/privileges.html',
                controller: ['$scope', function($scope) {
                    //
                }]
            });
    }]);
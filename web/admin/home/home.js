'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.home', {
                parent: "admin",
                url: '/admin/',
                templateUrl: 'admin/home/home.html',
                controller: ['$scope', function($scope) {
                    $scope.date = "January 2015";
                }]
            });
    }]);
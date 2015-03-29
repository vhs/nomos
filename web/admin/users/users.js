'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.users', {
                parent: "admin",
                url: '/users/',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/users/users.html',
                resolve: {
                    users: ['currentUser', 'UserService1', function(currentUser, UserService1) {
                        return UserService1.GetUsers();
                    }]
                },
                controller: ['$scope', '$modal', 'users', function($scope, $modal, users) {
                    $scope.users = users;
                }]
            });
    }]);
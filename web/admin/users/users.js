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
                        return UserService1.GetUsers().then(function(data) {
                            return data;
                        });
                    }]
                },
                controller: ['$scope', '$modal', 'users', 'UserService1', function($scope, $modal, users, UserService1) {
                    $scope.users = users;

                }]
            });
    }]);
'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.profile', {
                parent: "admin",
                url: '/users/:userId',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/users/profile.html',
                resolve: {
                    user: ['$stateParams', 'UserService1', function($stateParams, UserService1) {
                        return UserService1.GetUser($stateParams.userId);
                    }]
                },
                controller: ['$scope', '$modal', 'user', function($scope, $modal, user) {
                    $scope.user = user;
                }]
            });
    }]);
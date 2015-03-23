'use strict';

angular
    .module('mmpApp.admin', ['ui.router', 'angular-md5', 'ui.bootstrap'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.users', {
                parent: "admin",
                url: '/users/',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/users/users.html',
                resolve: { currentUser: ["CurrentUser", function(CurrentUser) { return CurrentUser.getCurrentUser(); }] },
                controller: ['$scope', '$state', 'currentUser', function($scope, $state, currentUser) {
                    $scope.currentUser = currentUser;


                    if(!$scope.currentUser.id || !$scope.currentUser.hasPrivilege("administrator"))
                        $state.go("public.login");
                }]
            });
    }]);
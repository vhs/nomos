'use strict';

angular
    .module('mmpApp.admin', ['ui.router', 'angular-md5', 'ui.bootstrap'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin', {
                abstract: true,
                templateUrl: "admin/admin.html",
                data: {
                    access: "admin"
                },
                resolve: { currentUser: ["CurrentUser", function(CurrentUser) { return CurrentUser.getCurrentUser(); }] },
                controller: ['$scope', '$state', 'currentUser', function($scope, $state, currentUser) {
                    $scope.currentUser = currentUser;


                    if(!$scope.currentUser.id || !$scope.currentUser.hasPrivilege("administrator"))
                        $state.go("public.login");
                }]
            });
    }]);
'use strict';

angular
    .module('mmpApp.public')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('public.recovery.reset', {
                parent: "public",
                url: '/recovery/reset/',
                templateUrl: 'public/recovery/reset.html',
                controller: ['$scope', '$state', 'UserService1', function($scope, $state, UserService1) {
                    $scope.reset = function() {
                        UserService1.ResetPassword($scope.token, $scope.password).then(function(data) {
                            if (data == "Success")
                                $state.go("public.login");
                            else
                                $scope.error = data;
                        });
                    };
                }]
            });
    }]);
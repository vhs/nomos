'use strict';

angular
    .module('mmpApp.public')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('public.recovery', {
                parent: "public",
                url: '/recovery/',
                templateUrl: 'public/recovery/recovery.html',
                controller: ['$scope', '$state', 'UserService1', function($scope, $state, UserService1) {
                    $scope.reset = function() {
                        UserService1.RequestPasswordReset($scope.email).then(function(data) {
                            debugger;
                            if (data != "null")
                                $scope.error = data;
                            else
                                $state.go("public.recovery.reset");
                        });
                    };
                }]
            });
    }]);
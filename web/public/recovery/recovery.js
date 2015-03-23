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
                        $scope.sending = true;
                        $scope.error = "";
                        UserService1.RequestPasswordReset($scope.email).then(function(data) {
                            $scope.sending = false;
                            if (data.success)
                                $scope.success = true;
                            else
                                $scope.error = data.msg;
                        });
                    };
                }]
            });
    }]);
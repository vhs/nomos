'use strict';

angular
    .module('mmpApp.public')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('public.recovery.reset', {
                parent: "public",
                url: '/recovery/reset/:token',
                templateUrl: 'public/recovery/reset.html',
                controller: ['$scope', '$state', 'UserService1', '$stateParams', function($scope, $state, UserService1, $stateParams) {
                    $scope.reset = function() {
                        $scope.error = "";
                        if ($scope.repassword == $scope.password) {
                            UserService1.ResetPassword($stateParams.token, $scope.password).then(function (data) {
                                if (data.success)
                                    $scope.success = true;
                                else
                                    $scope.error = data.msg;
                            });
                        } else {
                            $scope.error = "Passwords do not match";
                        }
                    };
                }]
            });
    }]);
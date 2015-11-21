'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.purchase', {
                parent: "user",
                url: '/purchase/',
                templateUrl: 'user/purchase/purchase.html',
                controller: ['$scope', function($scope) {
                    $scope.membercard_one = true;
                    $scope.membercard_two = false;

                    $scope.membercard_image = function(index) {
                        if (index == '1') {
                            $scope.membercard_one = true;
                            $scope.membercard_two = false;
                        } else {
                            $scope.membercard_one = false;
                            $scope.membercard_two = true;
                        }

                    };
                }]
            });
    }]);
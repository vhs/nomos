'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.getinvolved', {
                parent: "user",
                url: '/getinvolved/?res',
                templateUrl: 'user/getinvolved/getinvolved.html',
                controller: ['$scope', '$location','$stateParams', function($scope, $location, $stateParams) {
                    if ($stateParams.res){
                        $scope.success = true;
                    }
                    $scope.slackReturn = $location.absUrl().split("?")[0];
                }]
            });
    }]);
'use strict'

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.getinvolved', {
            parent: 'user',
            url: '/getinvolved/?res',
            templateUrl: 'user/getinvolved/getinvolved.html',
            controller: [
                '$scope',
                '$location',
                '$stateParams',
                'UserService1',
                '$sce',
                function ($scope, $location, $stateParams, UserService1, $sce) {
                    $scope.updating = false
                    $scope.received = false
                    $scope.email = $scope.currentUser.email
                    $scope.response = $sce.trustAsHtml('<b>Success! An invite has been sent</b>')

                    if ($stateParams.res) {
                        $scope.success = true
                    }
                    $scope.slackReturn = $location.absUrl().split('?')[0]

                    $scope.requestSlackInvite = function () {
                        $scope.updating = true
                        UserService1.RequestSlackInvite($scope.email).then(function (response) {
                            $scope.updating = false
                            $scope.received = true
                            $scope.response = $sce.trustAsHtml(JSON.parse(response))
                        })
                    }
                }
            ]
        })
    }
])

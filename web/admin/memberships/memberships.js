'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.memberships', {
            parent: 'admin',
            url: '/admin/memberships',
            templateUrl: 'admin/memberships/memberships.html',
            resolve: {
                memberships: [
                    'MembershipService1',
                    function (MembershipService1) {
                        return MembershipService1.GetAll()
                    }
                ]
            },
            controller: [
                '$scope',
                'memberships',
                function ($scope, memberships) {
                    $scope.memberships = memberships
                }
            ]
        })
    }
])

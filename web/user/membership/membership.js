'use strict';

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.membership', {
            parent: 'user',
            url: '/membership/',
            templateUrl: 'user/membership/membership.html',
            controller: ['$scope', function ($scope) {}],
        });
    },
]);

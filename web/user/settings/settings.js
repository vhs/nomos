'use strict';

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.settings', {
            parent: 'user',
            url: '/settings/',
            templateUrl: 'user/settings/settings.html',
            controller: ['$scope', function ($scope) {}],
        });
    },
]);

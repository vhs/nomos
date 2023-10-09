'use strict';

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.home', {
            parent: 'admin',
            url: '/admin/',
            templateUrl: 'admin/home/home.html',
            resolve: {
                pendingAccounts: [
                    '$stateParams',
                    'MetricService1',
                    function ($stateParams, MetricService1) {
                        return MetricService1.GetPendingAccounts();
                    },
                ],
                paymentExceptions: [
                    '$stateParams',
                    'MetricService1',
                    function ($stateParams, MetricService1) {
                        return MetricService1.GetExceptionPayments();
                    },
                ],
            },
            controller: [
                '$scope',
                'pendingAccounts',
                'paymentExceptions',
                function ($scope, pendingAccounts, paymentExceptions) {
                    $scope.date = moment().format('MMMM YYYY');

                    $scope.pendingAccounts = pendingAccounts;
                    $scope.paymentExceptions = paymentExceptions;
                },
            ],
        });
    },
]);

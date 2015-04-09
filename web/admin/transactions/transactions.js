'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.transactions', {
                parent: "admin",
                url: '/transactions/',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/transactions/transactions.html',

                controller: ['$scope', '$modal', 'transactions', function($scope, $modal, transactions) {
                    $scope.transactions = transactions;
                }]
            });
    }]);
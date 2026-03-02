'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.transactions', {
            parent: 'admin',
            url: '/admin/transactions/',
            data: {
                access: 'admin'
            },
            templateUrl: 'admin/transactions/transactions.html',
            resolve: {
                transactions: [
                    'IpnService1',
                    function (IpnService1) {
                        return IpnService1.GetAll()
                    }
                ]
            },

            controller: [
                '$scope',
                '$modal',
                'transactions',
                function ($scope, _$modal, transactions) {
                    $scope.transactions = transactions
                }
            ]
        })
    }
])

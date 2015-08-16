'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.payments', {
                parent: "admin",
                url: '/admin/payments',
                templateUrl: 'admin/payments/payments.html',
                resolve: {
                    payments: ['PaymentService1', function(PaymentService1) {
                        return []; //PaymentService1.GetPaginated(0,10);
                    }]
                },
                controller: ['$scope', 'payments', function($scope, payments) {
                    $scope.payments = payments;
                }]
            });
    }]);
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
                        return PaymentService1.GetPaginated(0, 10);
                    }]
                },
                controller: ['$scope', 'payments', 'PaymentService1', function($scope, payments, PaymentService1) {
                  $scope.pagination = {
                    limit: 10,
                    offset: 0
                  };
                  $scope.payments = payments;

                  $scope.$watch($scope.pagination, function() {
                    $scope.payments = PaymentService1.GetPaginated($scope.pagination.offset, $scope.pagination.limit);
                  });
                }]
            });
    }]);
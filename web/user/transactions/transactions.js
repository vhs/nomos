'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.transactions', {
                parent: "user",
                url: '/transactions/',
                templateUrl: 'user/transactions/transactions.html',
                controller: ['$scope', 'PaymentService1', function($scope, PaymentService1) {
                    $scope.payments = [];

                    $scope.showPending = false;
                    $scope.togglePending = function(val) {
                        $scope.showPending = val;
                        $scope.refresh();
                    };

                    $scope.listService = {
                        page: 0,
                        size: 10,
                        columns: "id,txn_id,status,payer_fname,payer_lname,payer_email,date,pp,rate_amount,currency",
                        order: "date desc",
                        search: null,
                        filter: null
                    };

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.checkUpdated = function() {
                        if($scope.pendingUpdate <= 0) {
                            $scope.updated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.getPayments = function() {

                        $scope.listService.filter = null;
                        var filters = [];

                        if ($scope.showPending) {
                            filters.push({
                                column: "status",
                                operator: "=",
                                value: "0"
                            });
                        }

                        if ($scope.listService.search != null && $scope.listService.search != "") {
                            var val = "%" + $scope.listService.search + "%";
                            filters.push({
                                left: {
                                    column: "payer_email",
                                    operator: "like",
                                    value: val
                                },
                                operator: "or",
                                right: {
                                    left: {
                                        column: "payer_fname",
                                        operator: "like",
                                        value: val
                                    },
                                    operator: "or",
                                    right: {
                                        left: {
                                            column: "payer_lname",
                                            operator: "like",
                                            value: val
                                        },
                                        operator: "or",
                                        right: {
                                            left: {
                                                column: "item_name",
                                                operator: "like",
                                                value: val
                                            },
                                            operator: "or",
                                            right: {
                                                left: {
                                                    column: "item_number",
                                                    operator: "like",
                                                    value: val
                                                },
                                                operator: "or",
                                                right: {
                                                    column: "txn_id",
                                                    operator: "like",
                                                    value: val
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }

                        var addRightmost = function(filter, val) {
                            if (filter.right != null)
                                addRightmost(filter.right, val);
                            filter.right = val;
                        };

                        for (var i = 0; i < filters.length; i++) {
                            if ($scope.listService.filter == null) {
                                if (filters.length > 1) {
                                    $scope.listService.filter = {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    };
                                } else {
                                    $scope.listService.filter = filters[i];
                                    break;
                                }
                            } else {
                                if (i == filters.length - 1) {
                                    addRightmost($scope.listService.filter, filters[i]);
                                } else {
                                    addRightmost($scope.listService.filter, {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    });
                                }
                            }
                        }

                        return PaymentService1.ListUserPayments($scope.currentUser.id, $scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, $scope.listService.filter);
                    };

                    $scope.updated = function() {
                        $scope.getPayments().then(function(data) {
                            $scope.payments = data;
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.refresh = function() {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();
                }]
            });
    }]);
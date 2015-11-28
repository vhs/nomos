'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.payments', {
                parent: "admin",
                url: '/admin/payments',
                templateUrl: 'admin/payments/payments.html',
                controller: ['$scope', 'PaymentService1', function($scope, PaymentService1) {
                    $scope.payments = [];

                    $scope.replay = function (id) {
                        $scope.updating = true;
                        PaymentService1.ReplayPaymentProcessing(id).then(function(data){
                            alert(data);
                            $scope.updated();
                        });
                    };

                    $scope.showPending = false;
                    $scope.togglePending = function(val) {
                        $scope.showPending = val;
                        $scope.refresh();
                    };

                    $scope.showOrphaned = false;
                    $scope.toggleOrphaned = function(val) {
                        $scope.showOrphaned = val;
                        $scope.refresh();
                    };

                    $scope.listService = {
                        page: 0,
                        size: 10,
                        columns: "id,txn_id,status,user_id,payer_fname,payer_lname,payer_email,date,pp,item_number,rate_amount,currency",
                        order: "date desc",
                        search: null
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

                        var filter = null;
                        var filters = [];

                        if ($scope.showPending) {
                            filters.push({
                                column: "status",
                                operator: "=",
                                value: "0"
                            });
                        }

                        if ($scope.showOrphaned) {
                            filters.push({
                                left: {
                                    column: "user_id",
                                    operator: "=",
                                    value: "0"
                                },
                                operator: "and",
                                right: {
                                    column: "status",
                                    operator: "=",
                                    value: "1"
                                }
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
                            if (filter == null) {
                                if (filters.length > 1) {
                                    filter = {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    };
                                } else {
                                    filter = filters[i];
                                    break;
                                }
                            } else {
                                if (i == filters.length - 1) {
                                    addRightmost(filter, filters[i]);
                                } else {
                                    addRightmost(filter, {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    });
                                }
                            }
                        }

                        return PaymentService1.ListPayments($scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, filter);
                    };

                    $scope.updated = function() {
                        $scope.getPayments().then(function(data) {
                            $scope.payments = data;
                            //$scope.resetForms();
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
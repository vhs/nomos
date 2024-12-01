'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.payments', {
            parent: 'admin',
            url: '/admin/payments',
            templateUrl: 'admin/payments/payments.html',
            controller: [
                '$scope',
                'PaymentService1',
                function ($scope, PaymentService1) {
                    $scope.payments = []
                    $scope.itemCount = 0

                    $scope.replay = function (id) {
                        $scope.updating = true
                        PaymentService1.ReplayPaymentProcessing(id).then(function (data) {
                            alert(data)
                            $scope.updated()
                        })
                    }

                    $scope.showPending = false
                    $scope.togglePending = function (val) {
                        $scope.showPending = val
                        $scope.refresh()
                    }

                    $scope.showOrphaned = false
                    $scope.toggleOrphaned = function (val) {
                        $scope.showOrphaned = val
                        $scope.refresh()
                    }

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,txn_id,status,user_id,payer_fname,payer_lname,payer_email,date,pp,item_name,item_number,rate_amount,currency',
                        order: 'date desc',
                        search: null
                    }

                    $scope.updating = false
                    $scope.pendingUpdate = 0

                    $scope.checkUpdated = function () {
                        if ($scope.pendingUpdate <= 0) {
                            $scope.updated()
                        } else {
                            $timeout($scope.checkUpdated, 10)
                        }
                    }

                    $scope.getFilter = function () {
                        let filter = null
                        const filters = []

                        if ($scope.showPending) {
                            filters.push({
                                column: 'status',
                                operator: '=',
                                value: '0'
                            })
                        }

                        if ($scope.showOrphaned) {
                            filters.push({
                                left: {
                                    column: 'user_id',
                                    operator: '=',
                                    value: '0'
                                },
                                operator: 'and',
                                right: {
                                    column: 'status',
                                    operator: '=',
                                    value: '1'
                                }
                            })
                        }

                        if ($scope.listService.search != null && $scope.listService.search !== '') {
                            const val = '%' + $scope.listService.search + '%'
                            filters.push({
                                left: {
                                    column: 'payer_email',
                                    operator: 'like',
                                    value: val
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'payer_fname',
                                        operator: 'like',
                                        value: val
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'payer_lname',
                                            operator: 'like',
                                            value: val
                                        },
                                        operator: 'or',
                                        right: {
                                            left: {
                                                column: 'item_name',
                                                operator: 'like',
                                                value: val
                                            },
                                            operator: 'or',
                                            right: {
                                                left: {
                                                    column: 'item_number',
                                                    operator: 'like',
                                                    value: val
                                                },
                                                operator: 'or',
                                                right: {
                                                    column: 'txn_id',
                                                    operator: 'like',
                                                    value: val
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        const addRightmost = function (filter, val) {
                            if (filter.right != null) addRightmost(filter.right, val)
                            filter.right = val
                        }

                        for (let i = 0; i < filters.length; i++) {
                            if (filter == null) {
                                if (filters.length > 1) {
                                    filter = {
                                        left: filters[i],
                                        operator: 'and',
                                        right: null
                                    }
                                } else {
                                    filter = filters[i]
                                    break
                                }
                            } else if (i === filters.length - 1) {
                                addRightmost(filter, filters[i])
                            } else {
                                addRightmost(filter, {
                                    left: filters[i],
                                    operator: 'and',
                                    right: null
                                })
                            }
                        }

                        return filter
                    }

                    $scope.getPayments = function () {
                        const filter = $scope.getFilter()
                        const offset = ($scope.listService.page - 1) * $scope.listService.pageSize

                        return PaymentService1.ListPayments(
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter
                        )
                    }

                    $scope.getPaymentsCount = function () {
                        const filter = $scope.getFilter()

                        return PaymentService1.CountPayments(filter)
                    }

                    $scope.updated = function () {
                        $scope.getPaymentsCount().then(function (data) {
                            $scope.itemCount = data

                            $scope.getPayments().then(function (data) {
                                $scope.payments = data
                                //$scope.resetForms();
                                $scope.updating = false
                                $scope.pendingUpdate = 0
                            })
                        })
                    }

                    $scope.refresh = function () {
                        $scope.updating = true
                        $scope.updated()
                    }

                    $scope.refresh()
                }
            ]
        })
    }
])

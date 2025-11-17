'use strict'

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.transactions', {
            parent: 'user',
            url: '/transactions/',
            templateUrl: 'user/transactions/transactions.html',
            controller: [
                '$scope',
                'PaymentService1',
                function ($scope, PaymentService1) {
                    $scope.payments = []
                    $scope.itemCount = 0

                    $scope.showPending = false
                    $scope.togglePending = function (val) {
                        $scope.showPending = val
                        $scope.refresh()
                    }

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,txn_id,status,payer_fname,payer_lname,payer_email,date,pp,rate_amount,currency',
                        order: 'date desc',
                        search: null,
                        filter: null
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
                        let result = null
                        const filters = []

                        if ($scope.showPending) {
                            filters.push({
                                column: 'status',
                                operator: '=',
                                value: '0'
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
                            if (result == null) {
                                if (filters.length > 1) {
                                    result = {
                                        left: filters[i],
                                        operator: 'and',
                                        right: null
                                    }
                                } else {
                                    result = filters[i]
                                    break
                                }
                            } else if (i === filters.length - 1) {
                                addRightmost(result, filters[i])
                            } else {
                                addRightmost(result, {
                                    left: filters[i],
                                    operator: 'and',
                                    right: null
                                })
                            }
                        }

                        return result
                    }

                    $scope.getPayments = function () {
                        const filter = $scope.getFilter()
                        const offset = ($scope.listService.page - 1) * $scope.listService.pageSize

                        return PaymentService1.ListUserPayments(
                            $scope.currentUser.id,
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter
                        )
                    }

                    $scope.getPaymentsCount = function () {
                        const filter = $scope.getFilter()

                        return PaymentService1.CountUserPayments($scope.currentUser.id, filter)
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

'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.ipnrecords', {
            parent: 'admin',
            url: '/admin/ipn/records',
            templateUrl: 'admin/ipn/records.html',
            controller: [
                '$scope',
                'IpnService1',
                function ($scope, IpnService1) {
                    $scope.records = []
                    $scope.itemCount = 0

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
                        columns: 'id,created,validation,payment_status,payment_amount,payment_currency,payer_email,item_name,item_number,raw',
                        order: 'created desc',
                        search: null
                    }

                    $scope.columns = $scope.listService.columns.split(',')

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
                                column: 'payment_status',
                                operator: '=',
                                value: '0'
                            })
                        }

                        if ($scope.showOrphaned) {
                            filters.push({
                                column: 'validation',
                                operator: '=',
                                value: 'INVALID'
                            })
                        }

                        if ($scope.listService.search != null && $scope.listService.search !== '') {
                            const val = '%' + $scope.listService.search + '%'
                            filters.push({
                                left: {
                                    column: 'payment_status',
                                    operator: 'like',
                                    value: val
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'payment_amount',
                                        operator: 'like',
                                        value: val
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'payment_currency',
                                            operator: 'like',
                                            value: val
                                        },
                                        operator: 'or',
                                        right: {
                                            left: {
                                                column: 'payer_email',
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
                                                        column: 'raw',
                                                        operator: 'like',
                                                        value: val
                                                    }
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

                    $scope.getRecords = function () {
                        const filter = $scope.getFilter()
                        const offset = ($scope.listService.page - 1) * $scope.listService.pageSize

                        return IpnService1.ListRecords(
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter
                        )
                    }

                    $scope.getRecordsCount = function () {
                        const filter = $scope.getFilter()

                        return IpnService1.CountRecords(filter)
                    }

                    $scope.updated = function () {
                        $scope.getRecordsCount().then(function (data) {
                            $scope.itemCount = data

                            $scope.getRecords().then(function (data) {
                                $scope.records = data
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

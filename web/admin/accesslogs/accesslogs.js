'use strict';

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.accesslogs', {
            parent: 'admin',
            url: '/admin/accesslogs',
            templateUrl: 'admin/accesslogs/accesslogs.html',
            controller: [
                '$scope',
                'AuthService1',
                function ($scope, AuthService1) {
                    $scope.accesslogs = [];
                    $scope.itemCount = 0;

                    $scope.showUnauthorized = false;
                    $scope.toggleUnauthorized = function (val) {
                        $scope.showUnauthorized = val;
                        $scope.refresh();
                    };

                    $scope.showOrphaned = false;
                    $scope.toggleOrphaned = function (val) {
                        $scope.showOrphaned = val;
                        $scope.refresh();
                    };

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,key,type,authorized,from_ip,time,userid',
                        order: 'time desc',
                        search: null,
                    };

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.checkUpdated = function () {
                        if ($scope.pendingUpdate <= 0) {
                            $scope.updated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.getFilter = function () {
                        let filter = null;
                        const filters = [];

                        if ($scope.showUnauthorized) {
                            filters.push({
                                column: 'authorized',
                                operator: '=',
                                value: '0',
                            });
                        }

                        if ($scope.listService.search != null && $scope.listService.search != '') {
                            const val = '%' + $scope.listService.search + '%';
                            filters.push({
                                left: {
                                    column: 'userid',
                                    operator: 'like',
                                    value: val,
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'key',
                                        operator: 'like',
                                        value: val,
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'type',
                                            operator: 'like',
                                            value: val,
                                        },
                                        operator: 'or',
                                        right: {
                                            left: {
                                                column: 'from_ip',
                                                operator: 'like',
                                                value: val,
                                            },
                                            operator: 'or',
                                            right: {
                                                column: 'time',
                                                operator: 'like',
                                                value: val,
                                            },
                                        },
                                    },
                                },
                            });
                        }

                        const addRightmost = function (filter, val) {
                            if (filter.right != null) addRightmost(filter.right, val);
                            filter.right = val;
                        };

                        for (let i = 0; i < filters.length; i++) {
                            if (filter == null) {
                                if (filters.length > 1) {
                                    filter = {
                                        left: filters[i],
                                        operator: 'and',
                                        right: null,
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
                                        operator: 'and',
                                        right: null,
                                    });
                                }
                            }
                        }

                        return filter;
                    };

                    $scope.getAccessLogs = function () {
                        const filter = $scope.getFilter();
                        const offset = ($scope.listService.page - 1) * $scope.listService.pageSize;

                        return AuthService1.ListAccessLog(
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter,
                        );
                    };

                    $scope.getAccessCount = function () {
                        const filter = $scope.getFilter();

                        return AuthService1.CountAccessLog(filter);
                    };

                    $scope.updated = function () {
                        $scope.getAccessCount().then(function (data) {
                            $scope.itemCount = data;

                            $scope.getAccessLogs().then(function (data) {
                                $scope.accesslogs = data;
                                //$scope.resetForms();
                                $scope.updating = false;
                                $scope.pendingUpdate = 0;
                            });
                        });
                    };

                    $scope.refresh = function () {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();
                },
            ],
        });
    },
]);

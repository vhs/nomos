'use strict';

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.webhooks', {
            parent: 'user',
            url: '/webhooks/',
            templateUrl: 'user/webhooks/webhooks.html',
            controller: [
                '$scope',
                'WebHookService1',
                function ($scope, WebHookService1) {
                    $scope.webhooks = [];
                    $scope.itemCount = 0;

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,name,description,enabled,userid,url,translation,headers,method,eventid',
                        order: 'id',
                        search: null,
                        filter: null,
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
                        var filter = null;
                        var filters = [];

                        if ($scope.listService.search != null && $scope.listService.search != '') {
                            var val = '%' + $scope.listService.search + '%';
                            filters.push({
                                left: {
                                    column: 'name',
                                    operator: 'like',
                                    value: val,
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'description',
                                        operator: 'like',
                                        value: val,
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'url',
                                            operator: 'like',
                                            value: val,
                                        },
                                        operator: 'or',
                                        right: {
                                            left: {
                                                column: 'translation',
                                                operator: 'like',
                                                value: val,
                                            },
                                            operator: 'or',
                                            right: {
                                                left: {
                                                    column: 'headers',
                                                    operator: 'like',
                                                    value: val,
                                                },
                                                operator: 'or',
                                                right: {
                                                    column: 'method',
                                                    operator: 'like',
                                                    value: val,
                                                },
                                            },
                                        },
                                    },
                                },
                            });
                        }

                        var addRightmost = function (filter, val) {
                            if (filter.right != null) addRightmost(filter.right, val);
                            filter.right = val;
                        };

                        for (var i = 0; i < filters.length; i++) {
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

                    $scope.getWebHooks = function () {
                        var filter = $scope.getFilter();
                        var offset = ($scope.listService.page - 1) * $scope.listService.pageSize;

                        return WebHookService1.ListUserHooks(
                            $scope.currentUser.id,
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter,
                        );
                    };

                    $scope.getWebHookCount = function () {
                        var filter = $scope.getFilter();

                        return WebHookService1.CountUserHooks($scope.currentUser.id, filter);
                    };

                    $scope.updated = function () {
                        $scope.getWebHookCount().then(function (data) {
                            $scope.itemCount = data;

                            $scope.getWebHooks().then(function (data) {
                                $scope.webhooks = data;
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

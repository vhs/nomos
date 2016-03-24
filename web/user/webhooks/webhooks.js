'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.webhooks', {
                parent: "user",
                url: '/webhooks/',
                templateUrl: 'user/webhooks/webhooks.html',
                controller: ['$scope', 'WebHookService1', function($scope, WebHookService1) {
                    $scope.webhooks = [];

                    $scope.listService = {
                        page: 0,
                        size: 10,
                        columns: "id,name,description,enabled,userid,url,translation,headers,method,eventid",
                        order: "id",
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

                    $scope.load = function() {

                        $scope.listService.filter = null;
                        var filters = [];

                        if ($scope.listService.search != null && $scope.listService.search != "") {
                            var val = "%" + $scope.listService.search + "%";
                            filters.push({
                                left: {
                                    column: "name",
                                    operator: "like",
                                    value: val
                                },
                                operator: "or",
                                right: {
                                    left: {
                                        column: "description",
                                        operator: "like",
                                        value: val
                                    },
                                    operator: "or",
                                    right: {
                                        left: {
                                            column: "url",
                                            operator: "like",
                                            value: val
                                        },
                                        operator: "or",
                                        right: {
                                            left: {
                                                column: "translation",
                                                operator: "like",
                                                value: val
                                            },
                                            operator: "or",
                                            right: {
                                                left: {
                                                    column: "headers",
                                                    operator: "like",
                                                    value: val
                                                },
                                                operator: "or",
                                                right: {
                                                    column: "method",
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

                        return WebHookService1.ListUserHooks($scope.currentUser.id, $scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, $scope.listService.filter);
                    };

                    $scope.updated = function() {
                        $scope.load().then(function(data) {
                            $scope.webhooks = data;
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
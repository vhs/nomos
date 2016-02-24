'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.accesslogs', {
                parent: "user",
                url: '/user/accesslogs',
                templateUrl: 'user/accesslogs/accesslogs.html',
                controller: ['$scope', 'AuthService1', function($scope, AuthService1) {
                    $scope.accesslogs = [];

                    $scope.showUnauthorized = false;
                    $scope.toggleUnauthorized = function(val) {
                        $scope.showUnauthorized = val;
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
                        columns: "id,key,type,authorized,from_ip,time,userid",
                        order: "time desc",
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

                    $scope.getAccessLogs = function() {

                        var filter = null;
                        var filters = [];

                        if ($scope.showUnauthorized) {
                            filters.push({
                                column: "authorized",
                                operator: "=",
                                value: "0"
                            });
                        }

                        if ($scope.listService.search != null && $scope.listService.search != "") {
                            var val = "%" + $scope.listService.search + "%";
                            filters.push({
                                left: {
                                    column: "key",
                                    operator: "like",
                                    value: val
                                },
                                operator: "or",
                                right: {
                                    left: {
                                        column: "type",
                                        operator: "like",
                                        value: val
                                    },
                                    operator: "or",
                                    right: {
                                        left: {
                                            column: "authorized",
                                            operator: "like",
                                            value: val
                                        },
                                        operator: "or",
                                        right: {
                                            left: {
                                                column: "from_ip",
                                                operator: "like",
                                                value: val
                                            },
                                            operator: "or",
                                            right: {
                                                column: "time",
                                                operator: "like",
                                                value: val
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

                        return AuthService1.ListUserAccessLog($scope.currentUser.id, $scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, filter);
                    };

                    $scope.updated = function() {
                        $scope.getAccessLogs().then(function(data) {
                            $scope.accesslogs = data;
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

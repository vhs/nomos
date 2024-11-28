'use strict';

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.oauth.clients', {
            parent: 'admin',
            url: '/oauth/clients',
            data: {
                access: 'admin',
            },
            templateUrl: 'admin/oauth/clients.html',
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'AuthService1',
                function ($scope, $modal, $timeout, AuthService1) {
                    $scope.clients = [];
                    $scope.itemCount = 0;

                    $scope.showPending = false;
                    $scope.togglePending = function (val) {
                        $scope.showPending = val;
                        $scope.refresh();
                    };

                    $scope.showCash = false;
                    $scope.toggleCash = function (val) {
                        $scope.showCash = val;
                        $scope.refresh();
                    };

                    $scope.showExpired = false;
                    $scope.toggleExpired = function (val) {
                        $scope.showExpired = val;
                        $scope.refresh();
                    };

                    $scope.showActive = false;
                    $scope.toggleActive = function (val) {
                        $scope.showActive = val;
                        $scope.refresh();
                    };

                    $scope.showInactive = false;
                    $scope.toggleInactive = function (val) {
                        $scope.showInactive = val;
                        $scope.refresh();
                    };

                    $scope.showBanned = false;
                    $scope.toggleBanned = function (val) {
                        $scope.showBanned = val;
                        $scope.refresh();
                    };

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,name,secret,expires,userid,name,description,url,redirecturi,enabled',
                        order: 'id',
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
                        const orFilters = [];

                        if ($scope.showExpired) {
                            filters.push({
                                column: 'mem_expire',
                                operator: '<=',
                                value: moment().format('YYYY-MM-DD hh:mm:ss'),
                            });
                        }

                        if ($scope.listService.search != null && $scope.listService.search != '') {
                            const val = '%' + $scope.listService.search + '%';
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
                                            column: 'redirecturi',
                                            operator: 'like',
                                            value: val,
                                        },
                                    },
                                },
                            });
                        }

                        const addRightmost = function (filter, val) {
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

                        for (var i = 0; i < orFilters.length; i++) {
                            if (filter == null) {
                                if (orFilters.length > 1) {
                                    filter = {
                                        left: orFilters[i],
                                        operator: 'or',
                                        right: null,
                                    };
                                } else {
                                    filter = orFilters[i];
                                    break;
                                }
                            } else {
                                if (i == orFilters.length - 1) {
                                    addRightmost(filter, orFilters[i]);
                                } else {
                                    addRightmost(filter, {
                                        left: orFilters[i],
                                        operator: 'or',
                                        right: null,
                                    });
                                }
                            }
                        }

                        return filter;
                        //return AuthService1.ListClients($scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, filter);
                    };

                    $scope.getClients = function () {
                        const filter = $scope.getFilter();
                        const offset = ($scope.listService.page - 1) * $scope.listService.pageSize;

                        return AuthService1.ListClients(
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter,
                        );
                    };

                    $scope.getClientsCount = function () {
                        const filter = $scope.getFilter();

                        return AuthService1.CountClients(filter);
                    };

                    $scope.updated = function () {
                        $scope.getClientsCount().then(function (data) {
                            $scope.itemCount = data;

                            $scope.getClients().then(function (data) {
                                $scope.clients = data;

                                $scope.clients.forEach(function (client) {
                                    client.expiry = moment(client.expires).fromNow();
                                    client.expiry_date = moment(client.expires).format('MMMM Do YYYY');
                                    client.header = window.btoa(client.id + ':' + client.secret);
                                });

                                $scope.resetForms();

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

                    $scope.resetForms = function () {};

                    $scope.openCreateClient = function () {
                        const modalInstance = $modal.open({
                            templateUrl: 'CreateClientModal.html',
                            size: 'md',
                            controller: function ($scope, $modalInstance) {
                                $scope.client = {};

                                $scope.ok = function () {
                                    $modalInstance.close($scope.client);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (client) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            AuthService1.RegisterClient(client.name, client.description, client.url, client.redirecturi).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.checkUpdated();
                        });
                    };
                },
            ],
        });
    },
]);

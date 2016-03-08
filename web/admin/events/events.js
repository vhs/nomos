'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.events', {
                parent: "admin",
                url: '/events/',
                templateUrl: 'admin/events/events.html',
                controller: ['$scope', '$modal', '$timeout', 'EventService1', 'PrivilegeService1', function($scope, $modal, $timeout, EventService1, PrivilegeService1) {
                    $scope.events = [];

                    $scope.listService = {
                        page: 0,
                        size: 50,
                        columns: "id,name,domain,event,description,enabled",
                        order: "domain",
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
                                        column: "domain",
                                        operator: "like",
                                        value: val
                                    },
                                    operator: "or",
                                    right: {
                                        left: {
                                            column: "event",
                                            operator: "like",
                                            value: val
                                        },
                                        operator: "or",
                                        right: {
                                            column: "description",
                                            operator: "like",
                                            value: val
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

                        return EventService1.ListEvents($scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, $scope.listService.filter);
                    };

                    $scope.updated = function() {
                        $scope.load().then(function(data) {
                            $scope.events = data;
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.refresh = function() {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();

                    $scope.openCreate = function () {

                        var modalInstance = $modal.open({
                            templateUrl: 'CreateModal.html',
                            size: "lg",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = {};
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (object) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            EventService1.CreateEvent(object.name, object.domain, object.event, object.description, false)
                                .then(function() { $scope.pendingUpdate -= 1; });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openEdit = function (object) {

                        var modalInstance = $modal.open({
                            templateUrl: 'EditModal.html',
                            size: "lg",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object;
                                $scope.privileges = [];
                                var currentPriv = {};

                                $scope.ok = function () {
                                    $modalInstance.close({pref: $scope.object, privs: $scope.privileges});
                                };

                                //Build a map of selected privileges
                                angular.forEach(object.privileges, function(prefPriv){
                                    currentPriv[prefPriv.code] = prefPriv;
                                });
                                var promise = PrivilegeService1.GetAllPrivileges();
                                promise.then(function(privileges){
                                    $scope.privileges = [];
                                    angular.forEach(privileges, function(privilege){
                                        privilege.selected = angular.isDefined(currentPriv[privilege.code]);
                                        $scope.privileges.push(privilege);
                                    });
                                });

                                $scope.togglePrivilege = function(privilege){
                                    privilege.selected = !privilege.selected;
                                    $scope.privilegeDirty = true;
                                };


                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (arg) {
                            var object = arg.pref;
                            var privileges = arg.privs;
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            EventService1.UpdateEvent(object.id, object.name, object.domain, object.event, object.description, object.enabled)
                                .then(function() { $scope.checkUpdated(); $scope.pendingUpdate -= 1; });

                            var codes = [];
                            angular.forEach(privileges, function(priv){
                                if (priv.selected){
                                    codes.push(priv.code);
                                }
                            });

                            $scope.updating = true;
                            $scope.pendingUpdate += 1;
                            EventService1.PutEventPrivileges(object.id, codes).then(function(){
                                $scope.privilegeDirty = false;

                                $scope.checkUpdated();
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openDelete = function (object) {

                        var modalInstance = $modal.open({
                            templateUrl: 'DeleteModal.html',
                            size: "sm",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object;
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (object) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            EventService1.DeleteEvent(object.id)
                                .then(function() { $scope.pendingUpdate -= 1; });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openEnableDisable = function (object) {

                        var modalInstance = $modal.open({
                            templateUrl: 'EnableDisableModal.html',
                            size: "sm",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object;
                                $scope.enable = object.enabled ? "Disable" : "Enable";
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (object) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            EventService1.EnableEvent(object.id, !object.enabled)
                                .then(function() { $scope.pendingUpdate -= 1; });

                            $scope.checkUpdated();
                        });
                    };
                }]
            });
    }]);